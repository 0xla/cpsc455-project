import express from "express";
import {resetPassword, forgotPassword, loginUser, registerUser} from "./controllers/authControllers";
import {getUser, getAllUsers, editUser, followUser, unfollowUser} from "./controllers/userControllers";
import {getAllFollowingImages, likePost, unlikePost, uploadImage} from "./controllers/imageController";

import { protect } from "./middleware/auth";


const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */


router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.post("/api/users/forgot-password", forgotPassword);
router.put("/api/users/reset-password/:resetToken", resetPassword);

router.put("/api/users/:id", editUser);

/**
 * IMAGE ENDPOINTS
 */

router.post("/api/:userid/images", uploadImage);
router.post("/api/images", getAllFollowingImages);

/**
 * USER ENDPOINTS
 */

router.get("/api/users", getAllUsers);
router.get("/api/users/:id", getUser);
router.put("/api/users/follows/:id", followUser)
router.put("/api/users/unfollow/:id", unfollowUser)

/**
 * LIKE ENDPOINTS
 */

router.put("/api/posts/:postid/likes/:userid", likePost)
router.delete("/api/posts/:postid/likes/:userid", unlikePost)

export default router;
