import { Request, Response } from "express";
import {
    sendAlreadyExists,
    sendBadRequest,
    sendInternalServerError,
    sendNotFound,
    sendSuccess,
    sendUnauthorized,
} from "../utils/statusUtils";
import { emailVerificationTemplate } from "../constants/emailTemplates/emailVerification";
import { API_RESPONSES } from "../constants/apiResponses";
import User from "../models/user.model";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import {
    generateAccessAndRefreshToken,
    getPayloadDataFromHeader,
    verifyToken,
} from "../utils/tokenUtils";
import { sendEmail } from "../utils/emailUtils";
import { forgotPasswordTemplate } from "../constants/emailTemplates/forgetPassword";
import { passwordChangeTemplate } from "../constants/emailTemplates/passwordChange";

export const handleSignUp = async (req: Request, res: Response) => {
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

        // Send email verification link
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
            sendInternalServerError(res, API_RESPONSES.FAILED_TO_SEND_EMAIL);
            return;
        }
        sendSuccess(res, API_RESPONSES.EMAIL_SENT, HTTP_STATUS_CODES.OK);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        console.log("Signup error:");
        return;
    }
};

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;

        if ((!userName && !email) || (userName && email) || !password) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }

        const user = await User.findOne({ $or: [{ email }, { userName }] });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
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
            sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_GENERATE_TOKEN
            );
            return;
        }
        if (refreshToken) {
            user.refreshToken = refreshToken;
        } else {
            sendInternalServerError(
                res,
                API_RESPONSES.FAILED_TO_GENERATE_TOKEN
            );
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
            .cookie("refreshToken", refreshToken, options);
        sendSuccess(
            res,
            API_RESPONSES.USER_LOGGED_IN,
            HTTP_STATUS_CODES.CREATED,
            {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        );
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.FAILED_TO_LOGIN);
        return;
    }
};

export const handleLogout = async (req: Request, res: Response) => {
    const payload = getPayloadDataFromHeader(req, res);
    if (!payload) {
        sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
        return;
    }
    const userId = payload._id;
    try {
        const loggedInUser = await User.findByIdAndUpdate(
            userId,
            { $set: { refreshToken: "" } },
            { new: true }
        );
        if (!loggedInUser) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        res.clearCookie("accessToken");
        sendSuccess(res, API_RESPONSES.USER_LOGGED_OUT);
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
    }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const payload = verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!payload) {
        sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
        return;
    }
    try {
        const user = await User.findOne({ _id: payload._id });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        if (user.refreshToken !== refreshToken) {
            sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
            return;
        }
        const accessToken = user.generateAccessToken();
        sendSuccess(res, API_RESPONSES.TOKEN_REFRESHED, HTTP_STATUS_CODES.OK, {
            accessToken: accessToken,
        });
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handleOtpVerification = async (req: Request, res: Response) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        if (user.otpExpires && user.otpExpires < new Date()) {
            sendBadRequest(res, API_RESPONSES.OTP_EXPIRED);
            return;
        }
        if (user.otp != otp) {
            sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
            return;
        }
        user.isEmailVerified = true;
        await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            {
                $unset: {
                    otp: "",
                    otpExpires: "",
                },
            }
        );
        await user.save({ validateBeforeSave: false });
        sendSuccess(res, API_RESPONSES.USER_LOGGED_IN);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handleForgetPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const user = await User.findOne({ email });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
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
            sendInternalServerError(res, API_RESPONSES.FAILED_TO_SEND_EMAIL);
            return;
        }
        sendSuccess(res, API_RESPONSES.EMAIL_SENT, HTTP_STATUS_CODES.OK);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handlePasswordReset = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!newPassword || !otp) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const user = await User.findOne({ email: email });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        if (user.otpExpires && user.otpExpires < new Date()) {
            sendBadRequest(res, API_RESPONSES.OTP_EXPIRED);
            return;
        }
        if (user.otp !== otp) {
            sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
            return;
        }
        user.password = newPassword;
        await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            {
                $unset: {
                    otp: "",
                    otpExpires: "",
                },
            }
        );
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
            sendInternalServerError(res, API_RESPONSES.FAILED_TO_SEND_EMAIL);
            return;
        }
        sendSuccess(res, API_RESPONSES.PASSWORD_CHANGED);
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handlePasswordChange = async (req: Request, res: Response) => {
    const payload = getPayloadDataFromHeader(req, res);
    if (!payload) {
        sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
        return;
    }
    const userId = payload._id;
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const user = await User.findOne({ _id: userId });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        const isPasswordMatched = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordMatched) {
            sendBadRequest(res, API_RESPONSES.INVALID_PASSWORD);
            return;
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
            sendInternalServerError(res, API_RESPONSES.FAILED_TO_SEND_EMAIL);
            return;
        }
        sendSuccess(res, API_RESPONSES.PASSWORD_CHANGED);
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

