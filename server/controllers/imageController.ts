import { Request, Response } from "express";
import User from "../models/user.model";
import processFile from "../middleware/upload";
import util from "util";
import { Storage } from "@google-cloud/storage";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket_name: string = process.env.BUCKET_NAME || "";
const bucket = storage.bucket(bucket_name);
import * as vision from "@google-cloud/vision";
const client = new vision.ImageAnnotatorClient();

// const downloadAsJson = async (bucket: any, path: string) => {
//   const file = await bucket.file(path).download();
//   return JSON.parse(file[0].toString("utf8"));
// };

// export const getImagesAnalysis = async (req: Request, res: Response) => {
//   const features = [{ type: "LABEL_DETECTION" }, { type: "IMAGE_PROPERTIES" }];
//   const outputUri = "gs://cpsc-455-images/path/to/save/results/";

//   // where to get this?
//   const demoImages = [
//     "gs://cpsc-455-images/crocodile.jpg",
//     "gs://cpsc-455-images/demo-img.jpg",
//   ];

//   const imageRequestObjArr: any[] = [];
//   demoImages.forEach((image: string) => {
//     imageRequestObjArr.push({
//       image: {
//         source: {
//           imageUri: image,
//         },
//       },
//       features: features,
//     });
//   });

//   const outputConfig = {
//     gcsDestination: {
//       uri: outputUri,
//     },
//     batchSize: 2, // The max number of responses to output in each JSON file
//   };

//   const request = {
//     requests: imageRequestObjArr,
//     outputConfig,
//   };
//   const [operation] = await client.asyncBatchAnnotateImages(request);
//   const [filesResponse] = await operation.promise();

//   console.log(filesResponse);

//   if (filesResponse) {
//     const data = await downloadAsJson(
//       bucket,
//       "path/to/save/results/output-1-to-2.json"
//     );
//     res.status(200).json({
//       message: "image analysis retrieval succeeded",
//       data,
//     });
//   } else {
//     return res.status(404);
//   }
// };

export const uploadImage = async (req: Request, res: Response) => {
  const username = "mango12345";


  try {
    await processFile(req, res);
    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Create a new blob in the bucket and upload the file data.
    
    const blob = bucket.file(`${username}/images/${req.file!.originalname}`);
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
              likes: [],
            },
          },
        }
      );

      try {
        // Make the file public
        await bucket.file(`${username}/images/${req.file!.originalname}`).makePublic();
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
  const { postid, userid } = req.params;
  let result;

  try {
    result = await User.findOneAndUpdate(
      {
        "images.id": postid,
      },
      {
        $addToSet: {
          "images.$[images].likes": userid,
        },
      },
      {
        arrayFilters: [
          {
            "images.id": postid,
          },
        ],
        new: true,
      }
    );
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
};

/**
 * @param Expected request body: None, request url parameters: id of user who unliked the post, id of unliked post
 *
 * * @param Responds Responds with a success message, along with the updated image data or an error.
 */

export const unlikePost = async (req: Request, res: Response) => {
  const { postid, userid } = req.params;
  let result;

  try {
    result = await User.findOneAndUpdate(
      {
        "images.id": postid,
      },
      {
        $pull: {
          "images.$[images].likes": userid,
        },
      },
      {
        arrayFilters: [
          {
            "images.id": postid,
          },
        ],
        new: true,
      }
    );
  } catch (err) {
    res.status(400).json({
      message: "Error unliking post",
      error: err,
    });
  }

  res.status(200).json({
    message: "Successfully disliked post",
    data: result.images,
  });
};
