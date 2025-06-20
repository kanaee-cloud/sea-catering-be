import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from "../utils/auth.utils";
import { createError } from "../exceptions/error.exception";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw createError(
            "Unauthorized",
            "Token Required",
            401
        );
    }

    if(!verifyAccessToken(token)) {
        throw createError(
            "Unauthorized",
            "Invalid Token",
            401
        );
    }

    next()
}