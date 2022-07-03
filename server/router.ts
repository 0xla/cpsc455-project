import express from "express";
import {resetPassword, forgotPassword, loginUser, registerUser} from "./controllers/authControllers";
import { getUser, followUser, unfollowUser } from "./controllers/userControllers";
import { uploadImage, deleteImage, getImages, editImage } from "./controllers/imageController";
import { protect } from "./middleware/auth";

const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.get("/api/users/:id", getUser)
router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.post("/api/users/forgot-password", forgotPassword);
router.put("/api/users/reset-password/:resetToken", resetPassword);

router.put("/api/users/:id/follow", followUser);
router.put("/api/users/:id/unfollow", unfollowUser);

/**
 * IMAGE ENDPOINTS
 */

router.post("/api/:userid/images", uploadImage);
router.get("/api/:userid/images", getImages);
router.put("/api/:userid/images/:imageId", editImage);
router.delete("/api/:userid/images/:imageId", deleteImage);

export default router;
