import {Request, Response} from "express";
import User from "../models/user.model";
import USER_ERR from "../errors/userErrors";

/**
 * @param Expected request body: None, request query parameters (optional): username
 *
 * * @param Responds with all users found in database if no query parameters specified, else filters users
 *  *                based on query parameters
 */
export const getAllUsers = async (req: Request, res: Response) => {
    const filter: any = {};
    const validFilters = ["username"];

    for (const [key,value] of Object.entries(req.query)) {
        if (validFilters.includes(key)){
            filter[key] = value;
        }
    }


    User.find(filter)
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
};

