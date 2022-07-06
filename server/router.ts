import express from "express";
import {resetPassword, forgotPassword, loginUser, registerUser} from "./controllers/authControllers";
import { uploadImage} from "./controllers/imageController";
import { protect } from "./middleware/auth";
import {getAllUsers, getUser} from "./controllers/userControllers";


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

router.post("/api/:userid/images", uploadImage);

/**
 * USER ENDPOINTS
 */

router.get("/api/users", getAllUsers);
router.get("/api/users/:id", getUser);

export default router;
