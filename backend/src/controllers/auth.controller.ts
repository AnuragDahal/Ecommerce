import { Request, Response } from "express";
import {
    sendAlreadyExists,
    sendBadRequest,
    sendForbidden,
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
import { stripe } from "../utils/paymentUtils";

import Stripe from "stripe";

export const handleSignUp = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, userName, password } = req.body;
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
        return;
    }
};

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const { userName, email, password } = req.body;

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
        if (user.otp != otp) {
            sendBadRequest(res, API_RESPONSES.INVALID_CREDENTIALS);
            return;
        }
        const isOldPassword = await user.isPasswordCorrect(newPassword);
        if (isOldPassword) {
            sendBadRequest(res, API_RESPONSES.SAME_PASSWORD);
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
        const user = await User.findById({ _id: userId });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        const isPasswordMatched = await user.isPasswordCorrect(oldPassword);
        if (!isPasswordMatched) {
            sendBadRequest(res, API_RESPONSES.INVALID_PASSWORD);
            return;
        }
        const isPasswordSame = await user.isPasswordCorrect(newPassword);
        if (isPasswordSame) {
            sendBadRequest(res, API_RESPONSES.SAME_PASSWORD);
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
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handleGetRole = async (req: Request, res: Response) => {
    const payload = getPayloadDataFromHeader(req, res);
    if (!payload) {
        sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
        return;
    }
    const userId = payload._id;
    try {
        const user = await User.findById({ _id: userId });
        if (!user) {
            sendNotFound(res, API_RESPONSES.USER_NOT_FOUND);
            return;
        }
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK, {
            role: user.role,
        });
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
        return;
    }
};

export const handlePaymentIntent = async (req: Request, res: Response) => {
    try {
        const { items } = req.body;
        if (!items) {
            sendBadRequest(res, API_RESPONSES.MISSING_REQUIRED_FIELDS);
            return;
        }
        const totalAmount = items
            .map((item: any) => parseFloat(item.amount))
            .reduce((a: any, b: any) => a + b);
        const payemntIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100,
            currency: "usd",
            payment_method_types: ["card"],
        });
        sendSuccess(res, API_RESPONSES.SUCCESS, HTTP_STATUS_CODES.OK, {
            clientSecret: payemntIntent.client_secret,
            totalAmount: totalAmount,
        });
        return;
    } catch (error) {
        sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR, {
            message: JSON.stringify((error as Error).message),
        });
        return;
    }
};

export const handlePaymentRetrieve = async (req: Request, res: Response) => {
    if (req.method !== "POST") {
        sendForbidden(res, API_RESPONSES.METHOD_NOT_ALLOWED);
        return;
    }

    const { paymentIntentId } = req.body;

    // Validate paymentIntentId
    if (!paymentIntentId || typeof paymentIntentId !== "string") {
        sendBadRequest(res, API_RESPONSES.INVALID_PAYMENT_INTENT_ID);
        return;
    }

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
        );

        const responseData = {
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
            shipping: paymentIntent.shipping,
        };

        sendSuccess(
            res,
            API_RESPONSES.SUCCESS,
            HTTP_STATUS_CODES.OK,
            responseData
        );
        return;
    } catch (error) {
        if (error instanceof Stripe.errors.StripeError) {
            // Handle specific Stripe errors
            const message = error.message || API_RESPONSES.STRIPE_ERROR;
            sendInternalServerError(
                res,
                API_RESPONSES.INTERNAL_SERVER_ERROR,
                message
            );
            return;
        } else {
            sendInternalServerError(res, API_RESPONSES.INTERNAL_SERVER_ERROR);
            return;
        }
    }
};
