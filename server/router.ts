import express from "express";
import { loginUser, registerUser } from "./controllers/authControllers";
import { addImage, deleteImage, getImages, editImage, getImagesAnalysis} from "./controllers/imageController";
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

router.post("/api/images", addImage);
router.get("/api/images", getImages);
// router.get("/api/images/analysis", getSingleImageAnalysis);
router.get("/api/images/analysis", getImagesAnalysis);
router.put("/api/images/:imageId", editImage);
router.delete("/api/images/:imageId", deleteImage);

export default router;
