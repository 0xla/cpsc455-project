import express from "express";
import {resetPassword, forgotPassword, loginUser, registerUser} from "./controllers/authControllers";
import { addImage, deleteImage, getImages, editImage } from "./controllers/imageController";
import { protect } from "./middleware/auth";

const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);
router.post("/api/users/forgotpassword", forgotPassword);
router.put("/api/users/resetpassword/:resetToken", resetPassword);

/**
 * IMAGE ENDPOINTS
 */

router.post("api/images", addImage);
router.get("api/images", getImages);
router.put("api/images/:imageId", editImage);
router.delete("api/images/:imageId", deleteImage);

export default router;
