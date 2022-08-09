import {Request, Response} from "express";
import User from "../models/user.model";
import processFile from "../middleware/upload";
import util from "util";
import {Storage} from "@google-cloud/storage";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from "uuid";
import dotenv from "dotenv";

dotenv.config();
const storage = new Storage({keyFilename: "google-credentials.json"});
const bucket_name: string = process.env.BUCKET_NAME || "";
const bucket = storage.bucket(bucket_name);
import * as vision from "@google-cloud/vision";


const client = new vision.ImageAnnotatorClient();

export const getImageLabels = async (url: string): Promise<string[]> => {
    const request = {
        image: {source: {imageUri: url}},
        features: [{type: "LABEL_DETECTION"}],
    };

    const [result] = await client.annotateImage(request);
    const imageLabels: string[] = [];

    if (result.labelAnnotations) {
        for (const annotation of result.labelAnnotations) {
            if (annotation.description) {
                imageLabels.push(annotation.description);
            }
        }
    }
    return imageLabels;
};

export const uploadImage = async (req: Request, res: Response) => {
    try {
        await processFile(req, res);
    } catch (err) {
        return res.status(500).send({
            message: `Could not process the file ${err}`,
        });
    }

    if (!req.file) {
        return res.status(400).send({message: "Please upload a file!"});
    }
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file!.originalname);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });
    blobStream.on("error", (err) => {
        return res.status(500).send({message: err.message});
    });

    blobStream.on("finish", async (data: any) => {
        // Create URL for directly file access via HTTP.
        const publicUrl = util.format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        const imageLabels: string[] = await getImageLabels(publicUrl);

        const image = {
            id: uuidv4(),
            url: publicUrl,
            username: req.body.username,
            likes: [],
            createdAt: new Date(),
            profilePicture: req.body.profilePicture,
        };

        await User.findByIdAndUpdate(
            {_id: new ObjectId(req.params.userid)},
            {
                $push: {
                    images: image,
                    imageCategories: {
                        $each: imageLabels,
                    },
                },
            }
        );

        try {
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
            image: image,
            imageLabels: imageLabels,
        });
    });
    blobStream.end(req.file!.buffer);
};

/**
 * @param Expected request body: imageURL: profile picture URL uploaded by user,
 * request url parameters: userid: id of user updating their profile picture
 *
 * * @param Responds Responds with a success message, along with the updated image data or an error.
 */
export const uploadProfilePicture = async (req: Request, res: Response) => {
    const {userid} = req.params;
    const {imageURL} = req.body;
    let user;

    try {
        user = await User.findOneAndUpdate(
            {_id: userid},
            {
                $set: {
                    profilePicture: imageURL,
                    "images.$[].profilePicture": imageURL
                },
            },
            {
                new: true
            }
        );
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error uploading profile picture",
            error: err,
        });

    }
    return res.status(200).json({
        message: "Successfully uploaded profile picture",
        data: user
    });

}

/**
 * @param Expected request body: None, request url parameters: id of user who liked the post, id of liked post
 *
 * * @param Responds Responds with a success message, along with the updated image data or an error.
 */

export const likePost = async (req: Request, res: Response) => {
    const {postid, userid} = req.params;
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
    const {postid, userid} = req.params;
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


/**
 * @param Expected request body: None, request url parameters: id of user whose following feed images will be returned
 * @param Responds Responds with a success message, along with user following image data sorted by date (newest-oldest)
 * or an error.
 */
export const getAllFollowingImages = async (req: Request, res: Response) => {
    const {userId} = req.params;
    let followingArr;
    let imageData;

    try {
        followingArr = await User.findOne({
            _id: userId
        }).select('followings -_id')
    } catch (err) {
        return res.status(500).json({
            message: "Error getting followingArr from Mongodb",
            error: err,
        });
    }
    const followingIdArr = followingArr.followings.map((following: any) => {
        return following.id;
    })

    try {
        imageData = await User.find({'_id': {$in: followingIdArr}}).select('images -_id')
    } catch (err) {
        return res.status(500).json({
            message: "Error getting image data from Mongodb",
            error: err,
        });
    }

    const imageDataArr = []
    for (const data of imageData) {
        imageDataArr.push(data.images)
    }
    const flattened = imageDataArr.flat();
    const sortedImages = flattened.sort((imgObj1: any, imgObj2: any) => imgObj2.createdAt - imgObj1.createdAt);

    return res.status(200).json({
        message: "Successfully retrieved all following images",
        images: sortedImages,
        following: followingIdArr,
    });
}
