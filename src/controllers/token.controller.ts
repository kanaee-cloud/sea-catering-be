import { Request, Response } from "express";
import { validateRefreshToken } from "../services/token.service";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { generateAccessToken,getUserIdFromJWTRefresh } from "../utils/auth.utils";


export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
     let token: any = req.cookies.refreshToken;

     await validateRefreshToken(token);

     const userId = getUserIdFromJWTRefresh(req)

     res.status(200).json({
          status: "success",
          message: "Successfully generate new Access Token",
          accessToken: generateAccessToken(userId)
     });

     return
});