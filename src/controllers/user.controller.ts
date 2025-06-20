import {Request, Response} from 'express';
import { registerUserSchema, loginUserSchema } from "../dtos/user.dtos";
import {createUser, getUser} from "../services/user.service";
import {comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken} from "../utils/auth.utils";
import {asyncHandler} from "../exceptions/async_handler.exception";
import { logger } from "../utils/logging.utils";
import {createError} from "../exceptions/error.exception";
import { createRefreshToken, deleteToken, getToken } from '../services/token.service';


export const registerController = asyncHandler(async (req: Request, res: Response) => {
        const registerData = await registerUserSchema.validateAsync(req.body);

        const {
            username,
            email,
            password
        } = registerData;

        const user = await createUser(username, email, password);

        logger.info(`Success create user ${user.username} with email: ${user.email}`);
        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            details: {
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            }
        });
        return
})

export const loginController = asyncHandler(async (req: Request, res: Response) => {
    const loginData = await loginUserSchema.validateAsync(req.body);

    const {
        email,
        password
    } = loginData;

    const user = await getUser({email: email});

    if(!await comparePassword(password, user.password)) {
        throw createError("failed", "Wrong password", 400)
        return
    }

    const refreshToken = await createRefreshToken(user.id)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true, 
        secure: true,
        sameSite: 'strict',
        path: "/api/v1",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
)

    res.status(200).json({
        status: "success",
        message: "Successfully logged in",
        token: generateAccessToken(user.id)
    });
    
    return
})

export const getUserController = asyncHandler(async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken)

    if (!token) {
        throw createError("failed", "Please attach token", 400);
        return
    }

    const user = await getUser({ id: token.userId });

    res.status(200).json({
        status: "success",
        message: "Successfully get user",
        details: {
            user: {
                email: user.email,
                username: user.username,
                role: user.role
            }
        }
    });

    return
})

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
        throw createError("failed", "Please attach RefreshToken", 400);
        return
    };

    await deleteToken(token);

    res.clearCookie("refreshToken");

    res.status(200).json({
        status: "success",
        message: "Successfully Logged out",
    });

    return
})