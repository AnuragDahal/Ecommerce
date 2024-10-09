import { Request, Response } from "express";
import { API_RESPONSES } from "../constants/apiResponses";
import Product from "../models/product.model";
import {
    sendBadRequest,
    sendInternalServerError,
    sendSuccess,
} from "../utils/statusUtils";
import { imagekit } from "../utils/imageKit";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";

interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}

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

        const { name, price, description, totalQuantity,category } = multerReq.body;
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
