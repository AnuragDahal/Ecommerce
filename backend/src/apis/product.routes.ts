import { Router } from "express";
import { handleCreateProduct } from "../controllers/product.controller";
import upload from "../utils/multer";

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from product routes");
});

router.post("/create", upload.array("images", 5), handleCreateProduct);
// router.post("/update", handleUpdateProduct);
// router.post("/delete", handleDeleteProduct);
// router.get("/list", handleListProduct);

export default router;
