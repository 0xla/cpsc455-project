import { Request, Response } from "express";
import User from "../models/user.model";
import * as vision from "@google-cloud/vision";

export const addImage = () => {};
export const getImages = () => {};
export const deleteImage = () => {};
export const editImage = () => {};

export const getSingleImageAnalysis = async (req: Request, res: Response) => {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.labelDetection(
    "https://raw.githubusercontent.com/googleapis/python-vision/master/samples/snippets/quickstart/resources/wakeupcat.jpg"
  );
  const labels = result.labelAnnotations;

  if (labels) {
    res.status(200).json({
      message: "image analysis retrieval succeeded",
      labels: labels,
    });
  } else {
    return res.status(404);
  }
};
