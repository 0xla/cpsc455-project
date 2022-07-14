import express from "express";
import {resetPassword, forgotPassword, loginUser, registerUser} from "./controllers/authControllers";
import {getUser, getAllUsers, editUser} from "./controllers/userControllers";
import { uploadImage} from "./controllers/imageController";

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

router.put("/api/users/:id", editUser);
// router.put("/api/users/:id", unfollowUser);

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
