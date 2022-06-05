import User from "../models/user.model";
import {handleAuthErrors} from "../errors/authErrors";
import {Request, Response} from 'express';


/**
 *
 * @param Expected request body:
 *        {
 *          username: string,
 *          password: string,
 *
 *        }
 * @param Responds with created user's id and jwt token, or validation errors.
 */
export const registerUser = async (req :Request, res :Response) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        sendToken(user,200,res);
    } catch (err){
        const errors = handleAuthErrors(err);
        return res.status(400).json({
            message: "Failed to create user.",
            errors: errors
        });

    }
}

/**
 *
 * @param Expected request body:
 *        {
 *          username: string,
 *          password: string,
 *        }
 * @param Responds with user's id and jwt token, or validation errors.
 */

export const loginUser = async (req :Request, res :Response) => {
    console.log(req.body)
    const {usernameOrEmail, password} = req.body;
    try {
        const user = await User.login(usernameOrEmail,password);
        sendToken(user,200,res);
    } catch(err) {
        const errors = handleAuthErrors(err);
        return res.status(400).json({
            message: "Failed to login.",
            errors: errors
        });

    }

}

const sendToken = (user: any, statusCode: any, res: Response) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, user: user._id})
}










