import { Router } from 'express';
import { getUserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/me", getUserController);

export default router;