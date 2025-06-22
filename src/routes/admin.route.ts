import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { getAdminController, handleCancelSubscriptionAdmin, handlePauseSubscriptionAdmin } from "../controllers/admin.controller";
import { getAdminDashboard } from "../controllers/admin.controller";
import { getAllUsersController } from "../controllers/admin.controller";
import { handleGetSubscriptions, handleResumeSubscription } from "../controllers/subscription.controller";
import { handleCreateMealplan, handleGetMealplanDetail, handleGetMealplans } from "../controllers/mealplan.controller";

const router = Router();

router.use(adminMiddleware);
router.get("/me", getAdminController);
router.get("/dashboard", getAdminDashboard);
router.get("/user/list", getAllUsersController)
router.get("/subscription/list", handleGetSubscriptions);
router.patch("/subscription/pause", handlePauseSubscriptionAdmin);
router.patch("/subscription/cancel", handleCancelSubscriptionAdmin);
router.patch("/subscription/resume", handleResumeSubscription);
router.post('/mealplan', handleCreateMealplan);   
router.get('/mealplan', handleGetMealplans); 
router.get('/mealplan/:id', handleGetMealplanDetail);    



export default router;
