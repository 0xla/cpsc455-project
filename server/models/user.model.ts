import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter a username"],
            trim: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: [6, "Minimum password length is 6 characters"]
        },

    },
    {
        timestamps: true,
    }
)

// fires a function before doc is saved to db. In this case we create a salt, apply it to the password, then hash it.
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

// static method to login in user

userSchema.statics.login = async function (usernameOrEmail, password) {
    console.log(usernameOrEmail)
    const user = await this.findOne({usernameOrEmail});
    console.log("user is " + user)

    if (user) {
       const auth = await bcrypt.compare(password, user.password);
       if (auth) {
           return user;
       }
       throw Error ("Incorrect password");
    }

    throw Error ("Incorrect username");
}

userSchema.methods.getSignedToken = function () {
    // @ts-ignore
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}


const User = mongoose.model("user", userSchema)
export default User as any

