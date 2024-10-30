import { Router } from "express";
import {
    handleAddToCart,
    handleClearCart,
    handleCreateProduct,
    handleDeleteProduct,
    getCartContents,
    handleRemoveFromCart,
    handleUpdateProduct,
    handleProductRetrieval,
    handleAllProductsRetrieval,
} from "../controllers/product.controller";
import upload from "../utils/multer";

const router = Router();

router.get("/", handleAllProductsRetrieval);
router.post("/create", upload.array("images", 5), handleCreateProduct);
router.post("/update/:id", upload.array("images", 5), handleUpdateProduct);
router.delete("/delete/:id", upload.array("images", 5), handleDeleteProduct);
router.post("/add-to-cart", handleAddToCart);
router.delete("/cart/:productId", handleRemoveFromCart);
router.delete("/clear-cart", handleClearCart);
router.get("/cart", getCartContents); //handleCartRetrieval);
router.get("/:productId", handleProductRetrieval);

export default router;
