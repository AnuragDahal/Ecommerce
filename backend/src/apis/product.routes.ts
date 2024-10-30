import { Router } from "express";
import {
    handleAddToCart,
    handleClearCart,
    handleCreateProduct,
    handleDeleteProduct,
    handleGetCart,
    handleRemoveFromCart,
    handleUpdateProduct,
} from "../controllers/product.controller";
import upload from "../utils/multer";

const router = Router();

router.get("/"); //handleProductsRetrieval);
router.post("/create", upload.array("images", 5), handleCreateProduct);
router.post("/update/:id", upload.array("images", 5), handleUpdateProduct);
router.delete("/delete/:id", upload.array("images", 5), handleDeleteProduct);
router.post("/add-to-cart", handleAddToCart);
router.delete("/cart/:productId", handleRemoveFromCart);
router.delete("/clear-cart", handleClearCart);
router.get("/cart", handleGetCart); //handleCartRetrieval);
router.get("/:id"); //handleProductRetrieval);

export default router;
