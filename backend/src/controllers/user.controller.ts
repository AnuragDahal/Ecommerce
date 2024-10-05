import { Request, Response, NextFunction } from "express";
import {
    sendAlreadyExists,
    sendBadRequest,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
} from "../utils/statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import User from "../models/user.model";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { generateAccessAndRefreshToken } from "../utils/tokenUtils";

export const handleSignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
    try {
        const { firstName, lastName, email, userName, password } = req.body;

        if (!firstName || !lastName || !email || !userName || !password) {
            return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
        }
        const isUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (isUser) {
            return sendAlreadyExists(res, API_RESPONSES.USER_ALREADY_EXISTS);
        }
        const user = new User({
            firstName,
            lastName,
            email,
            userName,
            password,
        });
        await user.save();

        return sendSuccess(
            res,
            API_RESPONSES.USER_CREATED,
            HTTP_STATUS_CODES.CREATED
        );
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response<any, Record<string, any>>> => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
        }
        const user = await User.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        const isPasswordMatched = user.isPasswordCorrect(password);
        if (!isPasswordMatched) {
            return sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
        }
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        if (refreshToken) {
            user.refreshToken = refreshToken;
        } else {
            return sendInternalServerError(
                res,
                API_RESPONSES.INTERNAL_SERVER_ERROR
            );
        }

        await user.save({ validateBeforeSave: false });

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none" as const,
            maxAge: 10 * 60 * 60 * 1000,
        };
        return res
            .status(HTTP_STATUS_CODES.OK)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: API_RESPONSES.USER_LOGGED_IN,
                user: loggedInUser,
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handleLogout = async (req: Request, res: Response) => {};

export const handleRefreshToken = async (req: Request, res: Response) => {};
