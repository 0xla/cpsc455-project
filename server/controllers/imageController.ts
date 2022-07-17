import { Request, Response } from "express";
import User from "../models/user.model";
import processFile from "../middleware/upload";
import util from "util";
import { Storage } from "@google-cloud/storage";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import USER_ERR from "../errors/userErrors";
import dotenv from "dotenv";
dotenv.config()
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
// const bucket = storage.bucket("cpsc-455-images");

const bucket_name: string = process.env.BUCKET_NAME || '';
const bucket = storage.bucket(bucket_name);

export const uploadImage = async (req: Request, res: Response) => {
  try {
    await processFile(req, res);
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file!.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream.on("error", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data: any) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      await User.findByIdAndUpdate(
        { _id: new ObjectId(req.params.userid) },
        {
          $push: {
            images: {
              id: uuidv4(),
              url: publicUrl,
              description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              likes: []
            },
          },
        }
      );

      try {
        // Make the file public
        await bucket.file(req.file!.originalname).makePublic();
      } catch (err) {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${
            req.file!.originalname
          }, but public access is denied! error message: ${err}`,
          url: publicUrl,
        });
      }
      res.status(200).send({
        message: "Uploaded the file successfully: " + req.file!.originalname,
        url: publicUrl,
      });
    });
    blobStream.end(req.file!.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file!.originalname}. ${err}`,
    });
  }
};

/**
 * @param Expected request body: None, request url parameters: id of user who liked the post, id of liked post
 *
 * * @param Responds Responds with a success message, along with the updated image data or an error.
 */

export const likePost = async (req: Request, res: Response) => {
  const {postid, userid} = req.params;
  console.log("user id" + userid)
  console.log("postid" + postid)
  let result;

  const voteRecord = await User.find(
      {
        $and: [{ 'images.likes': userid }, { 'images.id': postid}],
        // 'images.likes' : userid
      })

  console.log("vote record is" + voteRecord)

  if (voteRecord.length !== 0){
    return res.status(400).json({
      message: "User has already voted on this post.",
    });
  }

  try {
    result = await User.findOneAndUpdate(
        {'images.id': postid},
        {
          $push: {
            'images.$[].likes':
            userid
          }
        },{ arrayFilters: [{ 'images.id': postid }], new: true}
    )
  } catch (err) {
    return res.status(400).json({
      message: "Error liking post",
      error: err,
    });
  }




  return res.status(200).json({
    message: "Successfully liked post",
    data: result.images,
  });

}

/**
 * @param Expected request body: None, request url parameters: id of user who unliked the post, id of unliked post
 *
 * * @param Responds Responds with a success message, along with the updated image data or an error.
 */

export const unlikePost = async (req: Request, res: Response) => {
  const {postid, userid} = req.params;
  let result;

  try {
    result = await User.findOneAndUpdate(
        {'images.id': postid},
        {
          $pull: {
            'images.$[].likes':
            userid
          }
        }, {
          new: true
        }
    )
  } catch (err) {
    res.status(400).json({
      message: "Error unliking post",
      error: err,
    });
  }

  console.log(result)
  console.log("delete result is " + result.images)
  res.status(200).json({
    message: "Successfully disliked post",
    data: result.images,
  });

}

