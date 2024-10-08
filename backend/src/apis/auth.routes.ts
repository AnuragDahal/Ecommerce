import { Router } from "express";
import {
    handleSignUp,
    handleLogin,
    handleLogout,
    handleRefreshToken,
    handleOtpVerification,
    handlePasswordReset,
    handleForgetPassword,
    handlePasswordChange,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/refresh-token", handleRefreshToken);
router.post("/verify", handleOtpVerification);
router.post("/forgot-password", handleForgetPassword);
router.post("/reset-password", handlePasswordReset);
router.post("/change-password", handlePasswordChange);

// router.post("/resend-verification-email" /* handler */);

export default router;
