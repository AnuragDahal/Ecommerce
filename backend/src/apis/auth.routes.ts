import { Router } from "express";
import {
    handleSignUp,
    handleLogin,
    handleLogout,
    // handleSignUp,
} from "../controllers/user.controller";

const router = Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
// router.post("/logout", handleLogout);

export default router;
