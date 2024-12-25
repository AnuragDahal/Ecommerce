import { Router } from "express";
import {
    createUserOrder,
    getUserOrders,
    getUserProfile,
    handleUserProfile,
} from "../controllers/user.controller";
import upload from "../utils/multer";

const router = Router();
router.get("/profile", getUserProfile);
router.post("/profile", upload.single("image"), handleUserProfile);
router.post("/orders", createUserOrder);
router.get("/orders", getUserOrders);

export default router;
