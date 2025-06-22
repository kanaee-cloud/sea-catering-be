import { Router } from "express";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { getAdminController } from "../controllers/admin.controller";
import { getAdminDashboard } from "../controllers/admin.controller";

const router = Router();

router.use(adminMiddleware);
router.get("/me", getAdminController);
router.get("/dashboard", getAdminDashboard);


export default router;
