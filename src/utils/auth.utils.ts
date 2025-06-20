import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userInfo } from "os";
import { createError } from "../exceptions/error.exception";
import { Request } from "express";

const ACCESS_KEY: string = String(process.env.JWT_SECRET_ACCESS_KEY);
const REFRESH_KEY: string = String(process.env.JWT_SECRET_REFRESH_KEY);

interface JwtPayload {
    userId: number
}

export const generateAccessToken = (userId: number) => {
    return jwt.sign({userId}, ACCESS_KEY, {
        expiresIn: "2h",
    });
}

export const getUserIdFromJWT = (req: Request) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw createError(
                "Unauthorized",
                "Token Required",
                401
            );
        }

        const verifiedToken = verifyAccessToken(token)
     
        if(!verifiedToken) {
            throw createError(
                "Unauthorized",
                "Invalid Token",
                401
            );
        }

    return verifiedToken.userId
}

export const getUserIdFromJWTRefresh = (req: Request) => {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw createError(
                "Unauthorized",
                "Token Required",
                401
            );
        }

        const verifiedToken = verifyRefreshToken(token)
     
        if(!verifiedToken) {
            throw createError(
                "Unauthorized",
                "Invalid Token",
                401
            );
        }

    return verifiedToken.userId
}

export const generateRefreshToken = (userId: number) => {
    return jwt.sign({userId}, REFRESH_KEY, {
        expiresIn: "7d",
    });
}

export const verifyAccessToken = (token: string) => {
    try {
        return jwt.verify(token, ACCESS_KEY) as JwtPayload
    } catch (error) {
        return false
    }
}

export const verifyRefreshToken = (token: string) => {
    try {
        return jwt.verify(token, REFRESH_KEY) as JwtPayload
    } catch (error) {
        return false
    }
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
}