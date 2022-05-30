import User from "../models/user.model.js";
import {handleAuthErrors} from "../errors/authErrors.js";
import jwt from "jsonwebtoken";


/**
 *
 * How long the JWT lasts (3 days in seconds)
 */
const TIMETOLIVE = 3 * 24 * 60 * 60

const createToken = (id) => {
    return jwt.sign({id},process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: TIMETOLIVE
    });
}

/**
 *
 * @param Expected request body:
 *        {
 *          username: string,
 *          password: string,
 *
 *        }
 * @param Responds with created user's id and a cookie with JWT authentication, or validation errors.
 */
export const registerUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.create({
            username: username,
            password: password
        })
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: TIMETOLIVE * 1000});
        return res.status(200).json({
            message: "Successfully created user.",
            user: user._id
        });
    } catch (err){
        const errors = handleAuthErrors(err);
        console.log(errors)
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
 * @param Responds with user's id and a cookie with JWT authentication, or validation errors.
 */

export const loginUser = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, maxAge: TIMETOLIVE * 1000});
        return res.status(200).json({
            message: "Successfully logged user in.",
            user: user._id
        });

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
    res.status(statusCode).json({success: true, token})
}

//
// /**
//  * *
//  Middleware to prevent user from accessing unauthorized routes.
//  */
// export const requireAuth = (req,res, next) => {
//     const token = req.cookies.jwt;
//
//     if (token){
//         jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {});
//         if (err) {
//             res.redirect('/login')
//         } else {
//             next();
//         }
//     } else {
//         res.redirect('/login')
//     }
//
// }







