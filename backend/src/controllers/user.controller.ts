import { Request, Response } from "express";
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
import {
    generateAccessAndRefreshToken,
    getPayloadDataFromHeader,
    verifyToken,
} from "../utils/tokenUtils";
import { sendEmail } from "../utils/emailUtils";
import {
    emailVerificationTemplate,
    forgotPasswordTemplate,
    passwordChangeTemplate,
} from "../constants/emailTemplates";

// Assuming your statusUtils functions return Response
export type ControllerFunction = (
    req: Request,
    res: Response
) => Promise<Response>;

export const handleSignUp: ControllerFunction = async (req, res) => {
    const { firstName, lastName, email, userName, password } = req.body;

    if (!firstName || !lastName || !email || !userName || !password) {
        return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
    }

    const isUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (isUser) {
        return sendAlreadyExists(res, API_RESPONSES.USER_ALREADY_EXISTS);
    }

    try {
        const user = new User({
            firstName,
            lastName,
            email,
            userName,
            password,
        });

        const Otp = Math.floor(100000 + Math.random() * 900000);
        const emailData = {
            to: email,
            subject: "Email Verification",
            html: emailVerificationTemplate({ userName, otp: Otp }),
        };
        user.otp = Otp.toString();
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save({ validateBeforeSave: false });

        const isEmailSent = await sendEmail(
            emailData.to,
            emailData.subject,
            emailData.html
        );
        if (!isEmailSent) {
            return sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_SEND_EMAIL
            );
        }

        return sendSuccess(res, API_RESPONSES.EMAIL_SENT, HTTP_STATUS_CODES.OK);
    } catch (error) {
        console.log("Signup error:", error);
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handleLogin: ControllerFunction = async (req, res) => {
    const { userName, email, password } = req.body;

    if ((!userName && !email) || (userName && email) || !password) {
        return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
    }

    try {
        const user = await User.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }

        const isPasswordMatched = await user.isPasswordCorrect(password);
        if (!isPasswordMatched) {
            return sendUnauthorized(res, API_RESPONSES.INVALID_PASSWORD);
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user._id);

        if (!accessToken || !refreshToken) {
            console.log("Failed to generate access and refresh token");
            return sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_GENERATE_TOKEN
            );
        }

        user.refreshToken = refreshToken;
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
            .cookie("refreshToken", refreshToken, options);

        return sendSuccess(
            res,
            API_RESPONSES.USER_LOGGED_IN,
            HTTP_STATUS_CODES.CREATED,
            {
                accessToken,
                refreshToken,
            }
        );
    } catch (error) {
        return sendInternalServerError(res, API_RESPONSES.FAILED_TO_LOGIN);
    }
};

// Similarly update other controller functions...

export const handleLogout: ControllerFunction = async (req, res) => {
    const payload = getPayloadDataFromHeader(req, res);
    if (!payload) {
        return sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
    }

    try {
        const loggedInUser = await User.findByIdAndUpdate(
            payload._id,
            { $set: { refreshToken: "" } },
            { new: true }
        );
        if (!loggedInUser) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        res.clearCookie("accessToken");
        return sendSuccess(res, API_RESPONSES.USER_LOGGED_OUT);
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

// // Update the remaining functions (handleRefreshToken, handleOtpVerification, etc.) similarly...

export const handleRefreshToken: ControllerFunction = async (
    req: Request,
    res: Response
) => {
    const { refreshToken } = req.body;
    const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!payload) {
        return sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
    }
    try {
        const user = await User.findOne({ _id: payload._id });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        if (user.refreshToken !== refreshToken) {
            return sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
        }
        const accessToken = user.generateAccessToken();
        return sendSuccess(
            res,
            API_RESPONSES.TOKEN_REFRESHED,
            HTTP_STATUS_CODES.OK,
            {
                accessToken: accessToken,
            }
        );
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handleOtpVerification: ControllerFunction = async (
    req: Request,
    res: Response
) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
        }
        const user = await User.findOne({ email });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        if (user.otp !== otp) {
            return sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
        }
        if (user.otpExpires && user.otpExpires < new Date()) {
            return sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
        }
        user.isEmailVerified = true;
        user.otp = "";
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });
        return sendSuccess(res, API_RESPONSES.USER_LOGGED_IN);
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handleForgetPassword: ControllerFunction = async (
    req: Request,
    res: Response
) => {
    try {
        const { email } = req.body;
        if (!email) {
            return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
        }
        const user = await User.findOne({ email });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        const Otp = Math.floor(100000 + Math.random() * 900000);
        const emailData = {
            to: email,
            subject: "Reset Password",
            // to do change the template to password reset template
            html: forgotPasswordTemplate({
                userName: user.userName.toString(),
                otp: Otp,
            }),
        };
        user.otp = Otp.toString();
        user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save({ validateBeforeSave: false });

        const isEmailSent = await sendEmail(
            emailData.to,
            emailData.subject,
            emailData.html
        );
        if (!isEmailSent) {
            return sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_SEND_EMAIL
            );
        }
        return sendSuccess(res, API_RESPONSES.EMAIL_SENT, HTTP_STATUS_CODES.OK);
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handlePasswordReset: ControllerFunction = async (
    req: Request,
    res: Response
) => {
    // const payload = getPayloadDataFromHeader(req, res);
    // if (!payload) {
    //    return sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
    //
    // }
    // const userId = payload._id;
    try {
        const { email, otp, newPassword } = req.body;
        if (!newPassword || !otp) {
            return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        if (user.otp !== otp) {
            return sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
        }
        if (user.otpExpires && user.otpExpires < new Date()) {
            return sendBadRequest(res, API_RESPONSES.OTP_EXPIRED);
        }
        user.password = newPassword;
        user.otp = "";
        user.otpExpires = undefined;
        await user.save({ validateBeforeSave: false });

        const emailData = {
            to: email,
            subject: "Password Changed",
            html: passwordChangeTemplate({
                userName: user.userName.toString(),
            }),
        };
        const isEmailSent = await sendEmail(
            emailData.to,
            emailData.subject,
            emailData.html
        );
        if (!isEmailSent) {
            return sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_SEND_EMAIL
            );
        }
        return sendSuccess(res, API_RESPONSES.PASSWORD_CHANGED);
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};

export const handlePasswordChange: ControllerFunction = async (
    req: Request,
    res: Response
) => {
    const payload = getPayloadDataFromHeader(req, res);
    if (!payload) {
        return sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
    }
    const userId = payload._id;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
        }
        const isPasswordMatched = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordMatched) {
            return sendBadRequest(res, API_RESPONSES.INVALID_PASSWORD);
        }
        user.password = newPassword;
        await user.save({ validateBeforeSave: false });
        const emailData = {
            to: user.email,
            subject: "Password Changed",
            html: passwordChangeTemplate({
                userName: user.userName.toString(),
            }),
        };
        const isEmailSent = await sendEmail(
            emailData.to.toString(),
            emailData.subject,
            emailData.html
        );
        if (!isEmailSent) {
            return sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_SEND_EMAIL
            );
        }
        return sendSuccess(res, API_RESPONSES.PASSWORD_CHANGED);
    } catch (error) {
        return sendInternalServerError(
            res,
            API_RESPONSES.INTERNAL_SERVER_ERROR
        );
    }
};
