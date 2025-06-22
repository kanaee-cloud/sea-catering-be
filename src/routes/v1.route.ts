import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import subsriptionRouter from "./subscription.route"
import mealplanRouter from "./mealplan.route";
import adminAuthRouter from "./auth.admin.route";
import adminRouter from "./admin.route";


const router = Router();

router.use("/auth", authRouter);
router.use('/auth-admin', adminAuthRouter)
router.use("/user", userRouter);
router.use('/admin', adminRouter)
router.use('/subscription', subsriptionRouter)
router.use('/mealplan', mealplanRouter)



export default router;