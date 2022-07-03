import User from "../models/user.model";
import { Request, Response } from 'express';

export const followUser = async (req: Request, res: Response) => {
    if(req.params.id !== req.body.id){
        // params is storing the id of the user who is to Followed
        // body is storing the id of the user who is doing the action of following
        try{
            const userToBeFollowed = User.find({id:req.params.id});
            const userFollowing = User.find({id:req.body.id});
            if(!userToBeFollowed.followers.includes(userFollowing.id)){
                await userToBeFollowed.updateOne({ $push: { followers : req.body.id }} )
                await userFollowing.updateOne({$push: { following : req.params.id }})
                res.status(200).json("user has been followed");
            }
            else{
                res.status(403).json("you allready follow this user");
            }
        }
        catch(error: any){
            res.status(500).json(error);
        }
    }
    else{
        console.log("you can't follow yourself");
        res.status(403).json("you cant follow yourself");
    }
}

export const unfollowUser = async (req: Request, res: Response) => {
    if (req.body.userId !== req.params.id) {
        try {
          const userToBeUnfollowed = await User.findById(req.params.id);
          const userUnfollowing = await User.findById(req.body.userId);
          if (userToBeUnfollowed.followers.includes(req.body.userId)) {
            await userToBeUnfollowed.updateOne({ $pull: { followers: req.body.userId } });
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