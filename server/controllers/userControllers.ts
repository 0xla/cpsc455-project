import User from "../models/user.model";
import { Request, Response } from 'express';

export const getUser = async (req: Request, res: Response) => {
    try {
      console.log("receveing a request")
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
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