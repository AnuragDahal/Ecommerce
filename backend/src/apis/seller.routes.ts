import { Router } from "express";
import { handleSellerUserCreation } from "../controllers/seller.controller";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from seller routes");
});

router.post("/create", handleSellerUserCreation);

export default router;
