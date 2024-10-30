import { NextFunction, Response, Request } from "express";
import { sendUnauthorized } from "../utils/statusUtils";
import { API_RESPONSES } from "../constants/apiResponses";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
    interface Request {
        user?: {
            _id: string;
            firstName: string;
            lastName: string;
            userName: string;
            email: string;
        };
    }
}

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];
    const token = Array.isArray(authHeader)
        ? authHeader[0].split(" ")[1]
        : authHeader?.split(" ")[1];
    if (!token) {
        sendUnauthorized(res, API_RESPONSES.UNAUTHORIZED);
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        if (typeof decoded === "object" && decoded !== null) {
            req.user = decoded as {
                _id: string;
                firstName: string;
                lastName: string;
                userName: string;
                email: string;
            };
            next();
        }
    } catch (error) {
        sendUnauthorized(res, API_RESPONSES.INVALID_TOKEN);
        return;
    }
};
