import { send } from "process";
import { API_RESPONSES } from "../constants/apiResponses";
import { imagekit } from "../utils/imageKit";
import { sendBadRequest, sendSuccess } from "../utils/statusUtils";
import { Request, Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";

interface MulterRequest extends Request {
    files?: Express.Multer.File[];
}

export const handleImageUpload = async (req: Request, res: Response) => {
    try {
        const multerReq = req as MulterRequest;
        if (!multerReq.files || multerReq.files.length === 0) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const imageUrls = [];
        for (const file of multerReq.files) {
            const result = await imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
            });
            imageUrls.push(result.url);
        }
        sendSuccess(
            res,
            API_RESPONSES.IMAGE_UPLOAD_SUCCESS,
            HTTP_STATUS_CODES.OK,
            { imageUrls }
        );
    } catch (error) {}
};
