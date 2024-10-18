import { Response } from "express";
import { HTTP_STATUS_CODES } from "../constants/statusCodes";
import { API_RESPONSES } from "../constants/apiResponses";

export const sendBadRequest = (
    res: Response,
    message = API_RESPONSES.BAD_REQUEST
) => {
    return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
        statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
        message: message,
    });
};

export const sendUnauthorized = (
    res: Response,
    message = API_RESPONSES.UNAUTHORIZED
) => {
    return res.status(401).json({
        statusCode: 401,
        message: message,
    });
};

export const sendForbidden = (
    res: Response,
    message = API_RESPONSES.FORBIDDEN
) => {
    return res.status(HTTP_STATUS_CODES.FORBIDDEN).json({
        statusCode: HTTP_STATUS_CODES.FORBIDDEN,
        message: message,
    });
};

export const sendAlreadyExists = (
    res: Response,
    message = API_RESPONSES.USER_ALREADY_EXISTS
) => {
    return res.status(HTTP_STATUS_CODES.CONFLICT).json({
        statusCode: HTTP_STATUS_CODES.CONFLICT,
        message: message,
    });
};

export const sendNotFound = (
    res: Response,
    message = API_RESPONSES.NOT_FOUND
) => {
    return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
        statusCode: HTTP_STATUS_CODES.NOT_FOUND,
        message: message,
    });
};

export const sendInternalServerError = (
    res: Response,
    message = API_RESPONSES.INTERNAL_SERVER_ERROR
) => {
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        statusCode: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: message,
    });
};
export const sendSuccess = (
    res: Response,
    message = "Success",
    statusCode = HTTP_STATUS_CODES.OK,
    data = {}
) => {
    // Ensure the status code is a valid success code
    const validStatusCode =
        statusCode >= HTTP_STATUS_CODES.OK &&
        statusCode < HTTP_STATUS_CODES.BAD_REQUEST
            ? statusCode
            : HTTP_STATUS_CODES.OK;

    return res.status(validStatusCode).json({
        statusCode: validStatusCode,
        message: message,
        data: data,
    });
};
