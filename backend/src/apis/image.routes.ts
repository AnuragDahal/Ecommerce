import { Router } from "express";
import upload from "../utils/multer";
import { handleImageUpload } from "../controllers/imageController";

const router = Router();

router.post("/upload", upload.array("images", 10), handleImageUpload);
// router.delete("/delete", handleImageDeletion);

export default router;
