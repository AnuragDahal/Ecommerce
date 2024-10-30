import { Request, Response } from "express";
import { API_RESPONSES } from "../constants/apiResponses";
import Product, { IProduct } from "../models/product.model";
import {
    sendBadRequest,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
} from "../utils/statusUtils";
import {
    deletePreviousImages,
    imagekit,
    uploadMultipleFiles,
} from "../utils/imageKit";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import Seller from "../models/seller.model";
import { send } from "process";
import User from "../models/user.model";

interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}

// modify the upload function to accept multiple files and update the images as well as delete it from multer
export const handleCreateProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const multerReq = req as MulterRequest;
        const payload = req.user;
        if (!payload) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const seller = await Seller.findOne({ userId: payload._id });
        if (!seller) {
            sendNotFound(res, API_RESPONSES.NOT_FOUND);
            return;
        }
        if (!multerReq.files || multerReq.files.length === 0) {
            sendBadRequest(res, API_RESPONSES.IMAGE_UPLOAD_FAILED);
            return;
        }

        const { name, price, description, totalQuantity, category } =
            multerReq.body;
        if (!name || !price || !description || !totalQuantity || !category) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }

        const product = new Product({
            name,
            price,
            description,
            totalQuantity,
            category,
            sellerId: seller?.id,
            imageUrl: [],
        });

        const result = await uploadMultipleFiles(
            multerReq.files,
            `/ecommerce/products/${category}`
        );
        product.imageUrl = result;

        await product.save({ validateBeforeSave: false });
        seller.products.push(product._id as any);
        await seller.save({ validateBeforeSave: false });

        sendSuccess(
            res,
            API_RESPONSES.PRODUCT_CREATED,
            HTTP_STATUS_CODES.OK,
            product
        );
        return;
    } catch (error) {
        console.error("Error creating product:", error);
        sendInternalServerError(res, API_RESPONSES.UNABLE_TO_CREATE_PRODUCT);
        return;
    }
};

export const handleUpdateProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const productId = req.params.id;
        if (!productId) {
            sendNotFound(res, API_RESPONSES.PRODUCT_NOT_FOUND);
            return;
        }
        const multerReq = req as MulterRequest;
        const product = await Product.findById(productId);
        if (!product) {
            sendNotFound(res, API_RESPONSES.PRODUCT_NOT_FOUND);
            return;
        }

        // Define updatable fields
        const updatableFields: (keyof IProduct)[] = [
            "name",
            "price",
            "description",
            "totalQuantity",
            "category",
            "discount",
            "imageUrl",
        ];

        // Create update object
        const updateData: Partial<IProduct> = {};
        for (const field of updatableFields) {
            if (field in req.body) {
                updateData[field] = req.body[field];
            }
        }

        // Handle file uploads if any
        if (multerReq.files && multerReq.files.length > 0) {
            try {
                // Delete previous images
                await deletePreviousImages(product.imageUrl);

                // Upload new images
                updateData.imageUrl = await uploadMultipleFiles(
                    multerReq.files
                );
            } catch (uploadError) {
                console.error("Error handling image updates:", uploadError);
                sendInternalServerError(res, API_RESPONSES.IMAGE_UPLOAD_FAILED);
                return;
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { $set: updateData },
            { new: true } // This option returns the updated document
        );

        if (!updatedProduct) {
            sendNotFound(res, API_RESPONSES.PRODUCT_NOT_FOUND);
            return;
        }

        sendSuccess(
            res,
            API_RESPONSES.PRODUCT_UPDATED,
            HTTP_STATUS_CODES.OK,
            updatedProduct
        );
    } catch (error) {
        console.error("Error updating product:", error);
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
    }
    return;
};

export const handleDeleteProduct = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const productId = req.params.id;
        if (!productId) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }

        const product = await Product.findById(productId);
        if (!product) {
            sendNotFound(res, API_RESPONSES.NOT_FOUND);
            return;
        }

        const images = product.imageUrl;

        // Delete the images
        try {
            const isImageDeleted = await deletePreviousImages(images);
            if (!isImageDeleted) {
                sendInternalServerError(res, API_RESPONSES.IMAGE_DELETE_FAILED);
                return;
            }
        } catch (imageDeleteError) {
            console.error("Error during image deletion:", imageDeleteError);
        }

        sendSuccess(res, API_RESPONSES.PRODUCT_DELETED, HTTP_STATUS_CODES.OK);
        return;
    } catch (error) {
        console.error("Error deleting product:", error);
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};
// Cart related functions
export const handleAddToCart = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { products } = req.body;
        if (!products) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const user = await User.findById(req.user?._id);
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        user.cart.push(...products);
        await user.save({ validateBeforeSave: false });
        sendSuccess(res, API_RESPONSES.ADDED_TO_CART, HTTP_STATUS_CODES.OK);
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handleRemoveFromCart = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { productId } = req.params;
        console.log(productId);
        if (!productId) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const user = await User.findById(req.user?._id);
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        console.log(user.cart);
        user.cart = user.cart.filter(
            (item) => item.productId.toString() !== productId
        );
        await user.save({ validateBeforeSave: false });
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR, {
            message: (error as Error).message,
        });
        return;
    }
};

export const handleClearCart = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const user = await User.findById(req.user?._id);
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        user.cart = [];
        await user.save({ validateBeforeSave: false });
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};
