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

/**
 * @param Expected request body: None, request url parameters: user id
 *
 * * @param Responds Responds with a success message, along with the retrieved user,
 * or an error message if unsuccessful
 */
export const getUser = async (req: Request, res: Response) => {
    const id = req.params.id
    User.findById(id)
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


export const getAutoComplete = async (req: Request, res: Response) => {
    console.log("hello")
    try {
        let result;
        if(req.query.username) {
            result = await User.aggregate([
                {
                    $search: {
                        index: "autocomplete",
                        compound: {
                            must: [
                                {
                                    text: {
                                        query: req.query.username,
                                        path: "username",
                                        fuzzy: {
                                            maxEdits: 1,
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    $limit: 10,
                },
                {
                    $project: {
                        username: 1,
                        _id: 1,
                    },
                },
            ]);
            if (res) {
                return res.send(result);
            }
        } else {
            res.send([]);
        }
        }
     catch (err) {
        res.status(500).json( {
            message: "Error getting autocompleted users from MongoDB",
            error: err,
            errCode: USER_ERR.USER003
        })

    }
}