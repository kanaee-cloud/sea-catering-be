import { Request, Response } from "express";
import {
  createAdmin,
  logoutAdmin,
  getAdmin,
  getDashboardStats,
  cancelSubscriptionByAdmin,
  pauseSubscriptionByAdmin,
} from "../services/admin.service";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { createError } from "../exceptions/error.exception";
import {
  comparePassword,
  generateAccessToken,
  getUserInfoFromJWT,
  verifyRefreshToken,
} from "../utils/auth.utils";
import { loginAdminSchema, registerAdminSchema } from "../dtos/admin.dtos";
import { createRefreshToken } from "../services/token.service";
import { getAllUsers } from "../services/user.service";

export const registerAdminController = asyncHandler(
  async (req: Request, res: Response) => {
    const registerData = await registerAdminSchema.validateAsync(req.body);

    const { username, email, password } = registerData;

    const admins = await createAdmin(username, email, password);

    res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      details: {
        admin: {
          id: admins.id,
          email: admins.email,
          username: admins.username,
        },
      },
    });
  }
);

export const loginAdminController = asyncHandler(
  async (req: Request, res: Response) => {
    const loginData = await loginAdminSchema.validateAsync(req.body);

    const { email, password } = loginData;

    const admins = await getAdmin({ email: email });

    if (!(await comparePassword(password, admins.password))) {
      throw createError("failed", "Wrong password", 400);
      return;
    }

    const refreshToken = await createRefreshToken(admins.id, admins.role);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/v1",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Successfully logged in",
      token: generateAccessToken(admins.id, admins.role),
    });
  }
);

export const getAllUsersController = asyncHandler(
  async (_req: Request, res: Response) => {
    const users = await getAllUsers();
    res.status(200).json({
      status: "success",
      message: "Fetched all users",
      data: users,
    });

    return;
  }
);

export const getAdminController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = verifyRefreshToken(req.cookies.refreshToken);

    if (!token) {
      throw createError("failed", "Please attach token", 400);
      return;
    }

    const admins = await getAdmin({ id: token.userId });

    res.status(200).json({
      status: "success",
      message: "Successfully get admin",
      details: {
        user: {
          email: admins.email,
          username: admins.username,
          role: admins.role,
        },
      },
    });

    return;
  }
);

export const getAdminDashboard = asyncHandler(
  async (req: Request, res: Response) => {
    const { startDate, endDate } = req.query;

    const stats = await getDashboardStats({
      startDate: startDate ? new Date(startDate as string) : undefined,
      endDate: endDate ? new Date(endDate as string) : undefined,
    });

    res.status(200).json({
      status: "success",
      message: "Dashboard stats fetched",
      data: stats,
    });
  }
);

export const handlePauseSubscriptionAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = getUserInfoFromJWT(req);
    if (role !== "ADMIN") {
      return res.status(403).json({
        status: "fail",
        message: "Only admin can perform this action",
      });
    }

    const { subscriptionId, pauseStart, pauseEnd } = req.body;

    const updated = await pauseSubscriptionByAdmin(
      subscriptionId,
      pauseStart ? new Date(pauseStart) : undefined,
      pauseEnd ? new Date(pauseEnd) : undefined
    );

    res.status(200).json({
      status: "success",
      message: "Subscription paused by admin",
      data: updated,
    });
  }
);

export const handleCancelSubscriptionAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = getUserInfoFromJWT(req);
    if (role !== "ADMIN") {
      return res.status(403).json({
        status: "fail",
        message: "Only admin can perform this action",
      });
    }

    const { subscriptionId } = req.body;

    const updated = await cancelSubscriptionByAdmin(subscriptionId);

    res.status(200).json({
      status: "success",
      message: "Subscription cancelled by admin",
      data: updated,
    });
  }
);

export const logoutAdminController = asyncHandler(
  async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;

    if (!token) {
      throw createError("failed", "Please attach RefreshToken", 400);
      return;
    }

    await logoutAdmin(token);

    res.clearCookie("refreshToken");

    res.status(200).json({
      status: "success",
      message: "Successfully Logged out",
    });
  }
);
