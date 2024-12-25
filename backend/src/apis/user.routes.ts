import { Router } from "express";
import {
    createUserOrder,
    getUserOrders,
    getUserProfile,
    handleUserProfile,
} from "../controllers/user.controller";
import upload from "../utils/multer";
import { zodValidator } from "../middleware/zod";
import {
    updateUserProfileSchema,
    createOrderSchema,
} from "../schema";

const router = Router();
router.get("/profile", getUserProfile);
router.post(
    "/profile",
    upload.single("image"),
    zodValidator(updateUserProfileSchema),
    handleUserProfile
);
router.post("/orders", zodValidator(createOrderSchema), createUserOrder);
router.get("/orders", getUserOrders);

export default router;
