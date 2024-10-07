import { Request, Response, NextFunction } from "express";
import {
    sendAlreadyExists,
    sendBadRequest,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
    sendUnauthorized,
} from "../utils/statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import User from "../models/user.model";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { generateAccessAndRefreshToken } from "../utils/tokenUtils";

export const handleSignUp = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { firstName, lastName, email, userName, password } = req.body;

        if (!firstName || !lastName || !email || !userName || !password) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const isUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (isUser) {
            sendAlreadyExists(res, API_RESPONSES.USER_ALREADY_EXISTS);
            return;
        }
        const user = new User({
            firstName,
            lastName,
            email,
            userName,
            password,
        });
        await user.save();

        sendSuccess(res, API_RESPONSES.USER_CREATED, HTTP_STATUS_CODES.CREATED);
        console.log("User created successfully");
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        console.log("Signup error:");
        return;
    }
};

export const handleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { userName, email, password } = req.body;

        if ((!userName && !email) || (userName && email) || !password) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }

        const user = await User.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
            return;
        }

        const isPasswordMatched = await user.isPasswordCorrect(password);
        if (!isPasswordMatched) {
            sendUnauthorized(res, API_RESPONSES.INVALID_PASSWORD);
            return;
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        if (!accessToken && !refreshToken) {
            console.log("Failed to generate access and refresh token");
            sendInternalServerError(res, API_RESPONSES.FAILED_TO_GENERATE_TOKEN);
            return;
        }
        if (refreshToken) {
            user.refreshToken = refreshToken;
        } else {
            console.log("Refresh token is undefined");
            sendInternalServerError(res, API_RESPONSES.FAILED_TO_GENERATE_TOKEN);
            return;
        }
        await user.save({ validateBeforeSave: false });

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none" as const,
            maxAge: 10 * 60 * 60 * 1000, // 10 hours
        };

        res.status(HTTP_STATUS_CODES.OK)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: API_RESPONSES.USER_LOGGED_IN,
                user: loggedInUser,
                accessToken,
                refreshToken,
            });
    } catch (error) {
        console.error("Login error:", error);
        sendInternalServerError(res, API_RESPONSES.FAILED_TO_LOGIN);
        return;
    }
};

export const handleLogout = async (req: Request, res: Response) => {};

export const handleRefreshToken = async (req: Request, res: Response) => {};
