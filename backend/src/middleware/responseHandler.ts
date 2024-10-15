import { Request, Response, NextFunction } from "express";
import { ControllerFunction } from "../controllers/user.controller";

export const responseHandler = (controller: ControllerFunction) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    };
};
