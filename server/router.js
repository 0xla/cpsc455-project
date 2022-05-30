import express from "express";
import {loginUser, registerUser, requireAuth} from "./controllers/authControllers.js";




const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.post("/api/users/register",requireAuth, registerUser);
router.post("/api/users/login", loginUser);

export default router;