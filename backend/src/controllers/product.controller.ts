import { Request, Response } from "express";
import { API_RESPONSES } from "../constants/apiResponses";
import Product from "../models/product.model";
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
import multer from "multer";

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

        if (!multerReq.files || multerReq.files.length === 0) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }

        const { name, price, description, totalQuantity, category } =
            multerReq.body;
        if (!name || !price || !description || !totalQuantity) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }

        const product = new Product({
            name,
            price,
            description,
            totalQuantity,
            category,
            imageUrl: [], // Initialize the imageUrl array
        });

        for (const file of multerReq.files) {
            const result = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
            });
            product.imageUrl.push(result.url);
        }

        await product.save({ validateBeforeSave: false });
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

export const handleUpdateProduct = async (req: Request, res: Response) => {
    try {
        const multerReq = req as MulterRequest;
        const { name, price, description, totalQuantity, category, discount } =
            multerReq.body;
        const productId = multerReq.params.id;
        // Ensure productId is defined
        if (!productId) {
            sendNotFound(res, productId);
            return;
        }

        const product = await Product.findById(productId);
        if (!product) {
            sendNotFound(res, productId);
            return;
        }
        const prevousImages = product.imageUrl;

        // deltet the previous images
        // const deltedImages = await deletePreviousImages(prevousImages);
        // console.log("Deleted Images:", deltedImages);
        const updateData: Partial<typeof product> = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (description) updateData.description = description;
        if (totalQuantity) updateData.totalQuantity = totalQuantity;
        if (category) updateData.category = category;
        if (discount) updateData.discount = discount;

        // Handle file uploads if any
        if (multerReq.files && multerReq.files.length > 0) {
            updateData.imageUrl = [];
            for (const file of multerReq.files) {
                const result = await imagekit.upload({
                    file: file.buffer,
                    fileName: file.originalname,
                });
                updateData.imageUrl.push(result.url);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, {
            $set: { ...updateData, imageUrl: updateData.imageUrl },
        });

        if (!updatedProduct) {
            sendNotFound(res, API_RESPONSES.NOT_FOUND);
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
        sendInternalServerError(res, "Internal Server Error");
    }
};
