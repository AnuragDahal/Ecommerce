import { Router } from "express";
import {
    getReceivedOrders,
    handleSellerUserCreation,
} from "../controllers/seller.controller";
import upload from "../utils/multer";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from seller routes");
});

router.post("/create", upload.none(), handleSellerUserCreation);
router.get("/orders", getReceivedOrders);

export default router;
