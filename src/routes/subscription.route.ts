import { Router } from "express";
import {
  handleCancelSubscription,
  handleCreateSubscription,
  handleDeleteSubscription,
  handleGetSubscriptionDetail,
  handleResumeSubscription,
  handleTogglePauseSubscription,
} from "../controllers/subscription.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.post("/", handleCreateSubscription);
router.get("/:id", handleGetSubscriptionDetail);
router.delete("/:id", handleDeleteSubscription);
router.patch("/resume", handleResumeSubscription);
router.patch("/pause", handleTogglePauseSubscription);
router.patch("/cancel", handleCancelSubscription);

export default router;
