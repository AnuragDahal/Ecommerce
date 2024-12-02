import { Request, Response } from "express";
import {
    sendBadRequest,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
} from "../utils/statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import User from "../models/user.model";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { MulterRequest } from "./product.controller";
import { uploadSingleFile } from "../utils/imageKit";


export const getUserProfile = async (req: Request, res: Response) => {
    const userData = req.user;
    try {
        const user = await User.findById(userData?._id).select(
            "firstName lastName address profilePic email phoneNumber"
        );
        if (!user) {
            sendNotFound(res, API_RESPONSES.NOT_FOUND);
            return;
        }
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK, {
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            address: user.address || "",
            avatar: user.profilePic || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
        });
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handleUserProfile = async (req: Request, res: Response) => {
    try {
        const payload = req.user;
        const multerReq = req as MulterRequest;
        const user = await User.findById(payload?._id);
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        if (multerReq.file) {
            const imageUrl = await uploadSingleFile(
                multerReq.file!,
                `/ecommerce/avatar/${payload?.firstName! + payload?.lastName!}`
            );
            user.profilePic = imageUrl;
            user.save({ validateBeforeSave: false });
        }
        const { image, ...userDetails } = multerReq.body;
        const updatedUser = await User.findByIdAndUpdate(payload?._id, {
            $set: {
                ...userDetails,
            },
        });
        if (!updatedUser) {
            sendBadRequest(res, API_RESPONSES.UPDATE_FAILED);
            return;
        }
        sendSuccess(res, API_RESPONSES.UPDATE_SUCCESS);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};
