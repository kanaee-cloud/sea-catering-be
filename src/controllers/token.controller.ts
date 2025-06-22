import { Request, Response } from "express";
import { validateRefreshToken } from "../services/token.service";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { generateAccessToken, getRoleFromJWTRefresh, getUserIdFromJWTRefresh } from "../utils/auth.utils";


export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
     let token: any = req.cookies.refreshToken;

     await validateRefreshToken(token);

     const userId = getUserIdFromJWTRefresh(req)
     const role = getRoleFromJWTRefresh(req)

     res.status(200).json({
          status: "success",
          message: "Successfully generate new Access Token",
          accessToken: generateAccessToken(userId, role)
     });

     return
});