import User from "../models/user.model";
import {handleAuthErrors} from "../errors/authErrors";
import {Request, Response} from 'express';
import sendEmail from "../utils/sendEmail";
import * as crypto from "crypto";


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
export const registerUser = async (req: Request, res: Response) => {
    const {username, email, password} = req.body;
    try {
        const user = await User.create({
            username: username,
            email: email,
            password: password
        })
        sendToken(user, 200, res);
    } catch (err) {
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

export const loginUser = async (req: Request, res: Response) => {
    const {usernameOrEmail, password} = req.body;
    try {
        const user = await User.login(usernameOrEmail, password);
        sendToken(user, 200, res);
    } catch (err) {
        const errors = handleAuthErrors(err);
        return res.status(400).json({
            message: "Failed to login.",
            errors: errors
        });

    }

}

/**
 *
 * @param Expected request body:
 *        {
 *          email: string,
 *        }
 * @param Responds with success message if reset password email was successfully sent, else error message.
 */
export const forgotPassword = async (req: Request, res: Response) => {
    const {email} = req.body;

    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({
                message: "Email could not be sent.",
            });
        }


        const resetToken = user.getResetPasswordToken(); // creates reset token and expiration and stores the hashed token in the database
        await user.save();  // updates the document in db with newly created resetToken.
        const resetUrl = `http://localhost:3000/password-reset/${resetToken}`; // the URL the user will receive in their email
        const emailBody = `
        <h1>There was recently a request to change the password for your account. Please click on the following link to reset your password:</h1>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        <p>If you did not make this request, you can ignore this message and your password will remain the same.</p>`

        try {
            await sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: emailBody
            });
            res.status(200).json({
                success: true, data: "Reset password email sent"
            })

        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
            return res.status(404).json({
                message: "Email failed to send.",
            });
        }

    } catch (err) {
        return res.status(404).json({
            message: "Error when trying to reset password",
        });
    }
}

/**
 *
 * @param Expected request params:
 *        {
 *          resetPasswordToken: string,
 *        }
 * @param Responds with success message if password was reset, else error message.
 */
export const resetPassword = async (req: Request, res: Response) => {
    const {resetToken} = req.params;  // the token is being sent in reset url sent to the user
    const resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    try {
        const user = await User.findOne({
            resetPasswordToken, // find user with matching reset token
            resetPasswordExpire: {$gt: Date.now()} // check to make sure token not expired
        })

        if (!user) {
            return res.status(400).json({
                message: "Reset token is invalid.",
            });
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;
        await user.save();
        res.status(200).json({
            success: true,
            message: "Password successfully reset"
        })
    } catch (err) {
        return res.status(404).json({
            message: "Error when trying to reset password",
        });
    }
}

const sendToken = (user: any, statusCode: any, res: Response) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token, user: user._id });
};
