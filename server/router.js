import express from "express";
import {loginUser, registerUser} from "./controllers/authControllers.js";




const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

export default router;