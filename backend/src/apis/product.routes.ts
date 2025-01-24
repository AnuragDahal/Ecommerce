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
import { zodParamsValidator, zodValidator } from "../middleware/zod";
import {
    createProductSchema,
    updateProductSchema,
    addToCartSchema,
    removeFromCartSchema,
    manageCartQuantitySchema,
    productParams,
} from "../zod";
import { isAuthenticated } from "../middleware/authenticated";

const router = Router();

router.get("/", handleAllProductsRetrieval);
router.post("/create",isAuthenticated, upload.array("images", 5), zodValidator(createProductSchema), handleCreateProduct);
router.post("/update/:id", isAuthenticated,upload.array("images", 5),zodValidator(updateProductSchema), handleUpdateProduct);
router.delete("/delete/:id",isAuthenticated,upload.array("images", 5), handleDeleteProduct);
router.post("/add-to-cart", isAuthenticated,  zodValidator(addToCartSchema), handleAddToCart);
router.delete("/cart/:productId", isAuthenticated,zodParamsValidator(productParams), zodValidator(removeFromCartSchema), handleRemoveFromCart);
router.delete("/clear-cart", isAuthenticated,  handleClearCart);
router.get("/cart", isAuthenticated,  getCartContents);
router.put("/cart/:productId",zodParamsValidator(productParams), zodValidator(manageCartQuantitySchema), manageCartQuantity);
router.get("/:productId",zodParamsValidator(productParams), handleProductRetrieval);

export default router;