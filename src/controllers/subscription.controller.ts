import { Request, Response } from "express";
import { createSubscriptionSchema } from "../dtos/subscription.dtos";
import {
  cancelUserSubscription,
  createSubscription,
  deleteUserSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  resumeSubscription,
  resumeUserSubscription,
  togglePauseSubscription,
} from "../services/subscription.service";
import { asyncHandler } from "../exceptions/async_handler.exception";
import {  getUserIdFromJWT, getUserInfoFromJWT } from "../utils/auth.utils";

export const handleCreateSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const { error, value } = createSubscriptionSchema.validate(req.body);
    const userId = getUserIdFromJWT(req);

    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.message,
        userId: userId,
        data: value,
      });
    }

    const subscription = await createSubscription(value, userId);
    res.status(201).json({
      status: "success",
      message: "Subscription created successfully",
      data: subscription,
    });
  }
);

export const handleDeleteSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, role } = getUserInfoFromJWT(req);

    const targetUserId = role === "admin" ? Number(req.query.userId) || userId : userId;

    try {
      const deletedSubscription = await deleteUserSubscription(targetUserId);
      res.status(200).json({
        status: "success",
        message: "Subscription deleted successfully",
        data: deletedSubscription,
      });
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .json({ status: "fail", message: error.message });
    }
  }
);

export const handleGetSubscriptionDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const subscription = await getSubscriptionById(id);
      res.status(200).json({
        status: "success",
        message: "Get Subscription Detail successfully",
        data: subscription,
      });
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .json({ status: "fail", message: error.message });
    }
  }
);

export const handleGetSubscriptions = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = getUserInfoFromJWT(req);

    if (role !== "ADMIN") {
      return res.status(403).json({
        status: "fail",
        message: "Only admin can access all subscriptions",
      });
    }

    const subscriptions = await getAllSubscriptions();
    res.status(200).json({
      status: "success",
      message: "Get All Subscriptions successfully",
      data: subscriptions,
    });
  }
);

export const handleTogglePauseSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const userId = getUserIdFromJWT(req);
      const { pauseStart, pauseEnd } = req.body || {};

      const result = await togglePauseSubscription(
        userId,
        pauseStart ? new Date(pauseStart) : undefined,
        pauseEnd ? new Date(pauseEnd) : undefined
      );

      res.status(200).json({ status: "success", data: result });
    } catch (error) {
      res
        .status(500)
        .json({ status: "failed", message: "Internal server error" });
    }
  }
);

export const handleResumeSubscription = asyncHandler(async (req: Request, res: Response) => {
  const userId = getUserIdFromJWT(req);
  const result = await resumeUserSubscription(userId);
  res.status(200).json({ status: "success", data: result });
});


export const handleCancelSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = getUserIdFromJWT(req);
    const result = await cancelUserSubscription(userId);
    res.status(200).json({ status: "success", data: result });
  }
);

export const handleResumeSubscriptionAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const { role } = getUserInfoFromJWT(req);
    if (role !== "ADMIN") {
      return res.status(403).json({
        status: "fail",
        message: "Only admin can perform this action",
      });
    }

    const { subscriptionId } = req.body;

    const updated = await resumeSubscription(subscriptionId);

    res.status(200).json({
      status: "success",
      message: "Subscription resumed by admin",
      data: updated,
    });
  }
);
