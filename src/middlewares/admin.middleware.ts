import { NextFunction, Request, Response } from 'express';
import { getRoleFromJWT } from "../utils/auth.utils";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const role = getRoleFromJWT(req);

    if (role !== 'ADMIN') {
       res.status(403).json({
        status: "failed",
        message: "Access Denied: Admin Only",
      });
      return;
    }

    next();
  } catch (err: any) {
     res.status(err.statusCode || 401).json({
      status: "failed",
      message: err.message || "Unauthorized",
    });
    return;
  }
};
