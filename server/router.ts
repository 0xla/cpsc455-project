import express from "express";
import {loginUser, registerUser} from "./controllers/authControllers";
import {protect} from "./middleware/auth";

const router = express.Router();

/**
 * AUTHENTICATION ENDPOINTS
 */

router.post("/api/users/register", registerUser);
router.post("/api/users/login", loginUser);

export default router;