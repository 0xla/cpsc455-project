import User from "../models/user.model.js";
import AUTH_ERR from "../errors/authErrors.js";


/**
 *
 * @param Expected request body:
 *        {
 *          username: string,
 *          password: string,
 *
 *        }
 * @param Responds with created user.
 */
export const registerUser = async (req, res) => {
    const {username, password} = req.body;
    // console.log(body)

    try {
        const user = await User.create({
            username: username,
            password: password
        })
        return res.status(200).json({
            message: "Successfully created user.",
        });
    } catch (err){

        return res.status(500).json({
            message: "Failed to create user.",
            err,
            errCode: AUTH_ERR.AUTH001,
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
 * @param Responds with
 */

export const loginUser = async (req, res) => {
    const {username, password} = req.body;

    const user = await User.findOne( {
        username: username,
        password: password
    })

    if (user != null) {
        return res.status(200).json({
            message: "Successful login.",
        });
    } else {
        return res.status(400).json({
            message: "Unsuccessful login.",
        });

    }

}





