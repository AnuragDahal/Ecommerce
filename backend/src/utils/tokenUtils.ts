import { send } from "process";
import User from "../models/user.model";
import { Types } from "mongoose";
import { sendInternalServerError, sendUnauthorized } from "./statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateAccessAndRefreshToken = async (userId: Types.ObjectId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            return { error: "User not found" };
        }
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        // Save the user with the new refresh token and don't validate
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        return { error: "Error generating access and refresh token" };
    }
};

export const getPayloadDataFromHeader = (req: Request, res: Response) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        sendUnauthorized(res, API_RESPONSES.MISSING_HEADERS);
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!process.env.ACCESS_TOKEN_SECRET) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return payload;
};
