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
    manageCartQuantity,
} from "../controllers/product.controller";
import upload from "../utils/multer";
import { zodValidator } from "../middleware/zod";
import {
    createProductSchema,
    updateProductSchema,
    addToCartSchema,
    removeFromCartSchema,
    manageCartQuantitySchema,
    getProductSchema,
} from "../schema";

const router = Router();

router.get("/", handleAllProductsRetrieval);
router.post("/create", upload.array("images", 5), zodValidator(createProductSchema), handleCreateProduct);
router.post("/update/:id", upload.array("images", 5), zodValidator(updateProductSchema), handleUpdateProduct);
router.delete("/delete/:id", upload.array("images", 5), handleDeleteProduct);
router.post("/add-to-cart", zodValidator(addToCartSchema), handleAddToCart);
router.delete("/cart/:productId", zodValidator(removeFromCartSchema), handleRemoveFromCart);
router.delete("/clear-cart", handleClearCart);
router.get("/cart", getCartContents);
router.put("/cart/:productId", zodValidator(manageCartQuantitySchema), manageCartQuantity);
router.get("/:productId", zodValidator(getProductSchema), handleProductRetrieval);

export default router;