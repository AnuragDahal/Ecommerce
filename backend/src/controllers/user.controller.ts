import { Request, Response } from "express";
import {
    sendAlreadyExists,
    sendBadRequest,
    sendForbidden,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
} from "../utils/statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import User from "../models/user.model";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { MulterRequest } from "./product.controller";
import { uploadSingleFile } from "../utils/imageKit";
import Order from "../models/orders.model";
import Seller from "../models/seller.model";

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

export const createUserOrder = async (req: Request, res: Response) => {
    try {
        const { orderDetails, shippingAddress } = req.body;
        const user = await User.findById(req.user?._id);
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        if (user.cart.length === 0) {
            sendBadRequest(res, API_RESPONSES.CART_EMPTY);
            return;
        }

        const totalAmount = orderDetails.items.reduce(
            (acc: number, item: any) => acc + item.price,
            0
        );
        const newOrder = new Order({
            userId: req.user?._id,
            items: orderDetails.items,
            totalAmount,
            shippingDetails: {
                name: user.firstName + " " + user.lastName,
                address: { ...shippingAddress },
            },
            isPaid: true,
        });
        await newOrder.save({ validateBeforeSave: false });
        const addToSeller = orderDetails.items.map(async (item: any) => {
            const seller = await Seller.findById(item.sellerId);
            if (seller) {
                const order = {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                    userId: req.user?._id as string,
                    id: newOrder._id,
                };
                seller.orders.push(order);
                await seller.save({ validateBeforeSave: false });
            }
        });
        await Promise.all(addToSeller);
        user.cart = [];
        await user.save({ validateBeforeSave: false });
        sendSuccess(
            res,
            API_RESPONSES.ORDER_PLACED,
            HTTP_STATUS_CODES.CREATED,
            {
                orderId: newOrder._id,
            }
        );
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR, {
            error,
        });
        return;
    }
};

export const getUserOrders = async (req: Request, res: Response) => {
    try {
        const payload = req.user;
        const orders = await Order.find({ userId: payload?._id })
            .populate("items.productId", "name price")
            .populate("items.sellerId", "storeName contact.phone")
            .select("-items.price -items.quantity");
        if (!orders || orders.length === 0) {
            sendNotFound(res, API_RESPONSES.ORDER_NOT_FOUND);
            return;
        }
        const transformedOrders = orders.map((order) => ({
            id: order._id,
            items: order.items.map((item) => ({
                product: item.productId,
                seller: item.sellerId,
            })),
            total: order.totalAmount,
            status: order.status,
            date: new Date(order.createdAt)
                .toISOString()
                .slice(0, 19)
                .replace("T", " "),
        }));
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK, {
            orders: transformedOrders,
        });
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};
