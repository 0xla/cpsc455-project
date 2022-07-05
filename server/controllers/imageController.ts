import { Request, Response } from "express";
import User from "../models/user.model";
import processFile from "../middleware/upload";
import util from "util";
import { Storage } from "@google-cloud/storage";
import { ObjectId } from "mongodb";
const storage = new Storage({ keyFilename: "google-cloud-key.json" });
const bucket = storage.bucket("cpsc-455-images");

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
        { $push: { images: publicUrl } }
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
export const getImages = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userid);
    res.status(200).send({
      messages: "Images retrieved successfully",
      images: user.images,
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      message: `could not retrieve images: ${err}`,
    });
  }
};
export const deleteImage = () => {};
export const editImage = () => {};
