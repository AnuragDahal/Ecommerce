import { Router } from "express";
import {
    handleSignUp,
    handleLogin,
    handleLogout,
    handleRefreshToken,
    handleOtpVerification,
    handlePasswordReset,
    handleForgetPassword,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/refresh-token", handleRefreshToken);
router.post("/verify", handleOtpVerification);
router.post("/forgot-password", handleForgetPassword);
router.post("/reset-password", handlePasswordReset);
// router.post()

// router.post("/change-password");
// router.post("/forgot-password" /* handler */);
// router.post("/reset-password" /* handler */);
// router.post("/verify-email" /* handler */);
// router.post("/resend-verification-email" /* handler */);

export default router;
