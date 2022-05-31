import User from "../models/user.model.js";
import {handleAuthErrors} from "../errors/authErrors.js";


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
export const registerUser = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const user = await User.create({
            username: username,
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

export const loginUser = async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username,password);
        sendToken(user,200,res);
    } catch(err) {
        const errors = handleAuthErrors(err);
        return res.status(400).json({
            message: "Failed to login.",
            errors: errors
        });

    }

}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({success: true, token, user: user._id})
}










