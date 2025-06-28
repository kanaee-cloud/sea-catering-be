import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { getAdminController, handleCancelSubscriptionAdmin, handlePauseSubscriptionAdmin } from "../controllers/admin.controller";
import { getAdminDashboard } from "../controllers/admin.controller";
import { getAllUsersController } from "../controllers/admin.controller";
import { handleGetSubscriptions, handleResumeSubscriptionAdmin } from "../controllers/subscription.controller";
import { handleCreateMealplan } from "../controllers/mealplan.controller";

const router = Router();

router.use(adminMiddleware);
router.get("/me", getAdminController);
router.get("/dashboard", getAdminDashboard);
router.get("/user/list", getAllUsersController)
router.get("/subscription/list", handleGetSubscriptions);
router.patch("/subscription/pause", handlePauseSubscriptionAdmin);
router.patch("/subscription/cancel", handleCancelSubscriptionAdmin);
router.patch("/subscription/resume", handleResumeSubscriptionAdmin);
router.post('/mealplan', handleCreateMealplan);   




export default router;
