import { Response } from "express";

export const sendBadRequest = (res:Response, message = "Bad Request") => {
  return res.status(400).json({
    statusCode: 400,
    message: message,
  });
};

export const sendUnauthorized = (res:Response, message = "Unauthorized") => {
  return res.status(401).json({
    statusCode: 401,
    message: message,
  });
};

export const sendForbidden = (res:Response, message = "Forbidden") => {
  return res.status(403).json({
    statusCode: 403,
    message: message,
  });
};

export const sendNotFound = (res:Response, message = "Not Found") => {
  return res.status(404).json({
    statusCode: 404,
    message: message,
  });
};

export const sendInternalServerError = (
  res:Response,
  message = "Internal Server Error"
) => {
  return res.status(500).json({
    statusCode: 500,
    message: message,
  });
};
export const sendSuccess = (
  res:Response,
  statusCode = 200,
  message = "Success",
  data = {}
) => {
  // Ensure the status code is a valid success code
  const validStatusCode =
    statusCode >= 200 && statusCode < 300 ? statusCode : 200;

  return res.status(validStatusCode).json({
    statusCode: validStatusCode,
    message: message,
    data: data,
  });
};
