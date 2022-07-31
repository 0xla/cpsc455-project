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
 * @param Expected request body: None, request query parameters (optional): username, exact
 *
 * * @param Responds with all users' bio, profile image, follower and following list found in database if
 *                   no query parameters specified. Else filters users
 *  *                based on query parameters. If exact is set to false,
 *                   will only return suggested usernames as opposed to an exact match by default.
 */
export const getAllUsers = async (req: Request, res: Response) => {
    const filter: any = {};
    const validFilters = ["username"];
    const exactMatch = req.query.exact;

    for (const [key, value] of Object.entries(req.query)) {
        if (validFilters.includes(key)) {
            filter[key] = value;
        }
    }

    if (exactMatch === "true" || exactMatch === undefined) {
        User.find(filter, userProjection)
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
 * @param Expected request body: the id of the user who is currently logged in and following the user,
 * request url parameters: the id of the user who is being followed
 *
 * * @param Responds Responds with a success message, along with updated follower and following data or an error
 */

export const followUser = async (req: Request, res: Response) => {
    const idOfUserFollowing = req.body.id;
    const idOfFollowedUser = req.params.id;
    const userFollowing = await User.findById(idOfUserFollowing);
    const userToBeFollowed = await User.findById(idOfFollowedUser);
    if(idOfFollowedUser !== idOfUserFollowing){
        try{
            const followerResult = await User.findOneAndUpdate({
                    _id: idOfFollowedUser
                },
                {
                    $addToSet: {
                        "followers": {
                            id: idOfUserFollowing,
                            username: userFollowing.username
                        }
                    }
                },
                {
                    new: true
                })

            const followingResult = await User.findOneAndUpdate({
                    _id: idOfUserFollowing
                },
                {
                    $addToSet: {
                        "followings": {
                            id: idOfFollowedUser,
                            username: userToBeFollowed.username
                        }
                    }
                },
                {
                    new: true
                })

            return res.status(200).json({
                message: "Successfully followed user",
                followerData: followerResult.followers,
                followingData: followingResult.followings,
            });
        }

        catch(error: any){
            res.status(500).json({
                message: "Error getting user from MongoDB",
                error: error
            });
        }
    }
}

/**
 * @param Expected request body: the id of the user who is currently logged in and unfollowing the user,
 * request url parameters: the id of the user who is being unfollowed
 *
 * * @param Responds Responds with a success message, along with updated follower and following data or an error
 */
export const unfollowUser = async (req: Request, res: Response) => {
    const idOfUserUnfollowing = req.body.id;
    const idOfUnfollowedUser = req.params.id;
    if (idOfUserUnfollowing !== idOfUnfollowedUser) {
        try {
            const userToBeUnfollowed = await User.findById(idOfUnfollowedUser);
            const userUnfollowing = await User.findById(idOfUserUnfollowing);
            const userToBeUnfollowedIdList = userToBeUnfollowed.followers.map((element: any) => element.id);
            if (userToBeUnfollowedIdList.includes(idOfUserUnfollowing)) {


                const followerResult = await User.findOneAndUpdate({
                        "_id": idOfUnfollowedUser
                    },
                    {
                        $pull: {
                            followers: {
                                id: idOfUserUnfollowing,
                                username: userUnfollowing.username
                            }
                        }
                    },
                    {
                        new: true
                    }
                )

                const followingResult = await User.findOneAndUpdate({
                        "_id": idOfUserUnfollowing
                    },
                    {
                        $pull: {
                            followings: {
                                id: idOfUnfollowedUser,
                                username: userToBeUnfollowed.username
                            }
                        }
                    },
                    {
                        new: true
                    }
                )

                return res.status(200).json({
                    message: "Successfully unfollowed user",
                    followerData: followerResult.followers,
                    followingData: followingResult.followings,
                });

            }

        } catch (error: any) {
            res.status(500).json({
                message: "Error unfollowing user.",
                error: error
            });
        }
    }
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