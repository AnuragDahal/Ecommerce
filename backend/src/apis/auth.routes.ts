import { Router } from "express";
import {
    handleSignUp,
    handleLogin,
    handleRefreshToken,
    handleOtpVerification,
    handlePasswordReset,
    handleForgetPassword,
    handlePasswordChange,
    handleGetRole,
    handlePaymentIntent,
    handlePaymentRetrieve,
} from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/authenticated";

const router = Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/refresh-token", handleRefreshToken);
router.post("/verify", handleOtpVerification);
router.post("/forgot-password", handleForgetPassword);
router.post("/reset-password", handlePasswordReset);
router.post("/change-password", isAuthenticated, handlePasswordChange);
router.get("/get-role", handleGetRole);
router.post("/payment", isAuthenticated, handlePaymentIntent);
router.post("/payment-intent", isAuthenticated, handlePaymentRetrieve);

// router.post("/resend-verification-email" /* handler */);

export default router;
