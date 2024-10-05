import { Router } from "express";
import {
    handleLogin,
    handleLogout,
    handleSignUp,
} from "../controllers/user.controller";

const router = Router();

router.post("/sign-up", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/change-password");
router.post("/forgot-password" /* handler */);
router.post("/reset-password" /* handler */);
router.post("/verify-email" /* handler */);
router.post("/resend-verification-email" /* handler */);

export default router;
