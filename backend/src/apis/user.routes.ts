import { Router } from "express";
import {
    getUserProfile,
    handleUserProfile,
} from "../controllers/user.controller";
import upload from "../utils/multer";

const router = Router();
router.get("/profile", getUserProfile);
router.post("/profile", upload.single("image"), handleUserProfile);

export default router;
