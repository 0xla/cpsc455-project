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



export const followUser = async (req: Request, res: Response) => {
    if(req.params.id !== req.body.id){
        // params is storing the id of the user who is to Followed
        // body is storing the id of the user who is doing the action of following
        try{
            console.log("following a user");
            const userToBeFollowed = await User.findById(req.params.id);
            const userFollowing = await User.findById(req.body.id);
            console.log("storing users");
            if(!userToBeFollowed.followers.includes(req.body.id)){
                console.log("comes inside");
                await userToBeFollowed.updateOne({ $push: { followers : req.body.id }});
                console.log("followers list edited");
                await userFollowing.updateOne({$push: { followings : req.params.id }})
                console.log("following list updated");
                res.status(200).json("user has been followed");
            }
            else{
                res.status(403).json("you allready follow this user");
            }
        }
        catch(error: any){
            res.status(500).json({"error": error});
        }
    }
    else{
        console.log("you can't follow yourself");
        res.status(403).json("you cant follow yourself");
    }
}

export const unfollowUser = async (req: Request, res: Response) => {
    if (req.body.id !== req.params.id) {
        try {
          const userToBeUnfollowed = await User.findById(req.params.id);
          const userUnfollowing = await User.findById(req.body.id);
          if (userToBeUnfollowed.followers.includes(req.body.id)) {
            await userToBeUnfollowed.updateOne({ $pull: { followers: req.body.id } });
            await userUnfollowing.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("user has been unfollowed");
          } else {
            res.status(403).json("you dont follow this user");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("you cant unfollow yourself");
      }
}


