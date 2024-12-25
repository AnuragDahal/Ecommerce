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
import { zodValidator } from "../middleware/zod";
import {
    signUpSchema,
    loginSchema,
    refreshTokenSchema,
    otpVerificationSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    changePasswordSchema,
    paymentIntentSchema,
    paymentRetrieveSchema,
} from "../schema";

const router = Router();

router.post("/signup", zodValidator(signUpSchema), handleSignUp);
router.post("/login", zodValidator(loginSchema), handleLogin);
router.post("/refresh-token", zodValidator(refreshTokenSchema), handleRefreshToken);
router.post("/verify", zodValidator(otpVerificationSchema), handleOtpVerification);
router.post("/forgot-password", zodValidator(forgotPasswordSchema), handleForgetPassword);
router.post("/reset-password", zodValidator(resetPasswordSchema), handlePasswordReset);
router.post("/change-password", isAuthenticated, zodValidator(changePasswordSchema), handlePasswordChange);
router.get("/get-role", isAuthenticated, handleGetRole);
router.post("/payment", isAuthenticated, zodValidator(paymentIntentSchema), handlePaymentIntent);
router.post("/payment-intent", isAuthenticated, zodValidator(paymentRetrieveSchema), handlePaymentRetrieve);

export default router;