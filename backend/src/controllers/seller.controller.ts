// interface ISeller extends Document {
//     name: string;
//     userId: Schema.Types.ObjectId;
//     email: string;
//     storeName: string;
//     categoryOfProduct: string;
//     imageUrl: string;
//     products: Array<Types.ObjectId>;
//     paymentDetails: Array<{
//         bankAccountNumber: string;
//     }>;
//     contact: Array<{
//         phone: string;
//         email: string;
//
//     }>;
//     createdAt: Date;
//     updatedAt: Date;

import { Request, Response } from "express";
import Seller from "../models/seller.model";
import { getPayloadDataFromHeader } from "../utils/tokenUtils";
import {
    sendAlreadyExists,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
    sendUnauthorized,
} from "../utils/statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import User from "../models/user.model";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";


export const handleSellerUserCreation = async (req: Request, res: Response) => {
    try {
        const { storeName, businessEmail, paymentDetails, address, contact } =
            req.body;

        const user = await User.findById(req.user?._id);
        if (!user) {
            sendNotFound(res, API_RESPONSES.NOT_FOUND);
            return;
        }
        const isSeller = await Seller.findOne({ userId: req.user?._id });
        if (isSeller) {
            sendAlreadyExists(res, API_RESPONSES.SELLER_ALREADY_EXISTS);
            return;
        }

        const sellerDetails = {
            userId: req.user?._id,
            businessEmail,
            storeName,
            paymentDetails,
            contact,
            address,
        };

        const seller = new Seller(sellerDetails);
        await seller.save({ validateBeforeSave: false });
        user.role = "seller";
        await user.save({ validateBeforeSave: false });
        sendSuccess(
            res,
            API_RESPONSES.SELLER_CREATED,
            HTTP_STATUS_CODES.CREATED
        );
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const getReceivedOrders = async (req: Request, res: Response) => {
    try {
        const payload = req.user;
        const seller = await Seller.findOne({ userId: payload?._id });
        if (!seller) {
            sendNotFound(res, API_RESPONSES.NOT_FOUND);
            return;
        }
        const orders = seller.orders;
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK, {
            orders,
        });
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};
