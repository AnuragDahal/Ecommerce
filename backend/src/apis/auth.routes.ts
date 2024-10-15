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

import { responseHandler } from "../middleware/responseHandler";

const router = Router();

router.post("/signup", responseHandler(handleSignUp));
router.post("/login", responseHandler(handleLogin));
router.post("/logout", responseHandler(handleLogout));
router.post("/refresh-token", responseHandler(handleRefreshToken));
router.post("/verify", responseHandler(handleOtpVerification));
router.post("/forgot-password", responseHandler(handleForgetPassword));
router.post("/reset-password", responseHandler(handlePasswordReset));
router.post("/change-password", responseHandler(handlePasswordChange));
// Other routes...

export default router;
