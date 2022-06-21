import { Request, Response } from "express";
import User from "../models/user.model";
import * as vision from "@google-cloud/vision";
const client = new vision.ImageAnnotatorClient();

export const addImage = () => {};
export const getImages = () => {};
export const deleteImage = () => {};
export const editImage = () => {};

export const getSingleImageAnalysis = async (req: Request, res: Response) => {
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

export const getImagesAnalysis = async (req: Request, res: Response) => {
  const features = [{ type: "LABEL_DETECTION" }];
  const outputUri = "gs://cpsc-455-images/path/to/save/results/";
  const demoImages = [
    "gs://cpsc-455-images/crocodile.jpg",
    "gs://cpsc-455-images/demo-img.jpg",
  ];

  const imageRequestObjArr: any[] = [];
  demoImages.forEach((image: string) => {
    imageRequestObjArr.push({
      image: {
        source: {
          imageUri: image,
        },
      },
      features: features,
    });
  });

  const outputConfig = {
    gcsDestination: {
      uri: outputUri,
    },
    batchSize: 2, // The max number of responses to output in each JSON file
  };

  const request = {
    requests: imageRequestObjArr,
    outputConfig,
  };
  const [operation] = await client.asyncBatchAnnotateImages(request);
  const [filesResponse] = await operation.promise();

  if (filesResponse) {
    res.status(200).json({
      message: "image analysis retrieval succeeded",
      response: filesResponse,
    });
  } else {
    return res.status(404);
  }
};
