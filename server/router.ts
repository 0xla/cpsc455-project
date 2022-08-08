import express from "express";
import {resetPassword, forgotPassword, loginUser, registerUser} from "./controllers/authControllers";
import {
    getUser,
    getAllUsers,
    editUser,
    followUser,
    unfollowUser,
    getRandomUsers,
    getAllFollowing
} from "./controllers/userControllers";
import {
    getAllFollowingImages,
    likePost,
    unlikePost,
    uploadImage,
    uploadProfilePicture
} from "./controllers/imageController";
import { protect } from "./middleware/auth";


const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.post("/api/users/forgot-password", forgotPassword);
router.put("/api/users/reset-password/:resetToken", resetPassword);


/**
 * IMAGE ENDPOINTS
 */

router.post("/api/:userid/images/profile", uploadProfilePicture);
router.post("/api/:userid/images", uploadImage);
router.get("/api/images/following/:userId", getAllFollowingImages);


/**
 * USER ENDPOINTS
 */

router.get("/api/users", getAllUsers);
router.get("/api/users/random", getRandomUsers)
router.get("/api/users/:id/following", getAllFollowing)
router.get("/api/users/:id", getUser);
router.put("/api/users/:id", editUser);

/**
 * LIKE/UNLIKE ENDPOINTS
 */

router.put("/api/posts/:postid/likes/:userid", likePost)
router.delete("/api/posts/:postid/likes/:userid", unlikePost)

/**
 * FOLLOW/UNFOLLOW ENDPOINTS
 */

router.put("/api/users/:followingUserId/follows/:followedUserId", followUser)
router.put("/api/users/:unfollowingUserId/unfollows/:unfollowedUserId", unfollowUser)

export default router;
