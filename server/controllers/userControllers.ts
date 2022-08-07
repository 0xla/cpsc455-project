import User from "../models/user.model";
import { Request, Response } from 'express';
import USER_ERR from "../errors/userErrors";
  
const userProjection = {
    password: false,
    email: false,
    createdAt: false,
    updatedAt: false,
    __v: false,
    resetPasswordExpire: false,
    resetPasswordToken: false
}


/**
 * @param Expected request body: None, request query parameters (optional): username, exact, limit
 *
 * * @param Responds with all users' bio, profile image, follower and following list found in database if
 *                   no query parameters specified. Else filters users
 *  *                based on query parameters. If exact is set to false,
 *                   will only return suggested usernames as opposed to an exact match by default. Results returned
 *                   limited by limit param (if not specified, all records will be returned).
 */
 export const getAllUsers = async (req: Request, res: Response) => {
    const filter: any = {};
    const validFilters = ["username"];
    const exactMatch = req.query.exact;
    const limit = req.query.limit;

    for (const [key, value] of Object.entries(req.query)) {
        if (validFilters.includes(key)) {
            filter[key] = value;
        }
    }

    if (exactMatch === "true" || exactMatch === undefined) {
        User.find(filter, userProjection).limit(limit)
            .exec()
            .then((data: any) => {
                res.status(200).json({
                    message: "Successfully retrieved all users",
                    data: data,
                });
            })
            .catch((err: any) => {
                res.status(500).json({
                    message: "Error getting all users from MongoDB",
                    error: err,
                    errCode: USER_ERR.USER001
                });

            });
    } else {
        if (req.query.username) {
            try {
                const result = await getSuggestedUsers(req.query.username as string);
                return res.status(200).json({
                    message: "Successfully retrieved suggested users from MongoDb",
                    data: result
                })
            } catch(err) {
                res.status(500).json( {
                    message: "Error getting suggested users from MongoDB",
                    error: err,
                    errCode: USER_ERR.USER003
                })
            }
        } else {
            return res.status(200).json({
                message: "No username specified",
                data: []
            })

        }
    }
    }

export const getSuggestedUsers = async (username: string) => {
    let result;

    result = await User.aggregate([
        {
            $search: {
                "autocomplete": {
                    "path": "username",
                    "query": username,
                }
            }
        },
        {
            $limit: 10
        },
        {
            $project: {
                "_id": 0,
                "username": 1
            }
        }
    ])

    return result;

}

/**
 * @param Expected request body: None, request url parameters: user id
 *
 * * @param Responds Responds with a success message, along with the retrieved user,
 * or an error message if unsuccessful
 */
export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id
    User.findById(id, userProjection)
        .exec()
        .then((data: any) => {
            res.status(200).json({
                message: "Successfully retrieved user",
                data: data,
            });
        })
        .catch((err: any) => {
            res.status(500).json({
                message: "Error getting user from MongoDB",
                error: err,
                errCode: USER_ERR.USER002
            });
        });
}

/**
 * @param Expected request body: followingUsername: the username of the user who is currently logged in and following
 * a user, followedUsername: the username of the user being followed
 * request url parameters: followingUserId: the id of the user who is following a user, followedUserId: the
 * id of the user being followed
 *
 * * @param Responds Responds with a success message, along with updated follower and following data or an error
 */

export const followUser = async (req: Request, res: Response) => {
    const {followingUserId, followedUserId } = req.params;
    const {followingUsername, followedUsername} = req.body;
    let followerResult;
    let followingResult;

    if (followingUserId === followedUserId) {
        return res.status(400).json({
            message: "You can't follow yourself",
        });
    }

    try {
        followerResult = await User.findOneAndUpdate({
                _id: followedUserId
            },
            {
                $addToSet: {
                    "followers": {
                        id: followingUserId,
                        username: followingUsername
                    }
                }
            },
            {
                new: true
            })

        followingResult = await User.findOneAndUpdate({
                _id: followingUserId
            },
            {
                $addToSet: {
                    "followings": {
                        id: followedUserId,
                        username: followedUsername
                    }
                }
            },
            {
                new: true
            })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Error while following a user",
            error: err,
        });

    }

    return res.status(200).json({
        message: "Successfully followed user",
        followerData: followerResult.followers,
        followingData: followingResult.followings,
    });
}

/**
 * @param Expected request body: unfollowingUsername: the username of the user who is currently logged in and unfollowing
 * a user, unfollowedUsername: the username of the user being unfollowed
 * request url parameters: unfollowingUserId: the id of the user who is following a user, unfollowedUserId: the
 * id of the user being unfollowed
 *
 * * @param Responds Responds with a success message, along with updated follower and following data or an error
 */

export const unfollowUser = async (req: Request, res: Response) => {
    const {unfollowingUserId, unfollowedUserId } = req.params;
    const {unfollowingUsername, unfollowedUsername} = req.body;
    let unfollowerResult;
    let unfollowingResult;

    if(unfollowingUserId === unfollowedUserId) {
        return res.status(400).json({
            message: "You can't unfollow yourself",
        });
    }

    try {
        unfollowerResult = await User.findOneAndUpdate({
                "_id": unfollowedUserId
            },
            {
                $pull: {
                    followers: {
                        id: unfollowingUserId,
                        username: unfollowingUsername
                    }
                }
            },
            {
                new: true
            }
        )

        unfollowingResult = await User.findOneAndUpdate({
                "_id": unfollowingUserId
            },
            {
                $pull: {
                    followings: {
                        id: unfollowedUserId,
                        username: unfollowedUsername
                    }
                }
            },
            {
                new: true
            }
        )
    } catch(err) {
        return res.status(500).json({
            message: "Error while unfollowing a user",
            error: err,
        });
    }

    return res.status(200).json({
        message: "Successfully unfollowed user",
        followerData: unfollowerResult.followers,
        followingData: unfollowingResult.followings,
    });
}


export const uploadProfilePicture = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { imageLink } = req.body;

    try {
        await User.findOneAndUpdate({
            "_id": id
        },
        {
            profilePicture: imageLink
        }
    )
    } catch(err) {
        return res.status(500).json({
            message: "Error while updating the profile image",
            error: err,
        });
    }

    return res.status(200).json({
        message: "Successfully update profile image",
    });
}

export const editUser = (req:Request, res: Response) => {
    if(req.body.action){
        switch(req.body.action.toLowerCase()){
            case "follow":
                followUser(req, res);
                break;
            case "unfollow":
                unfollowUser(req, res);
                break;
            case "profile_picture":
                uploadProfilePicture(req, res);
                break;
            default: res.status(400).json(
                {
                    message: "Invalid Edit Request (Follow / Unfollow) ",
                    data: {
                        request : req.body.action
                    }
                }
            )
        }
    }
        
}