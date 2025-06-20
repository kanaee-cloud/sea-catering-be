import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import subsriptionRouter from "./subscription.route"
import mealplanRouter from "./mealplan.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use('/subscription', subsriptionRouter)
router.use('/mealplan', mealplanRouter)


export default router;