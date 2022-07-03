import express from "express";
import { loginUser, registerUser } from "./controllers/authControllers";
import { uploadImage, deleteImage, getImages, editImage } from "./controllers/imageController";
import { protect } from "./middleware/auth";

const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

/**
 * IMAGE ENDPOINTS
 */

router.post("/api/:userid/images", uploadImage);
router.get("/api/:userid/images", getImages);
router.put("/api/:userid/images/:imageId", editImage);
router.delete("/api/:userid/images/:imageId", deleteImage);

export default router;
