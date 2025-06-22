import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import subsriptionRouter from "./subscription.route"
import adminAuthRouter from "./auth.admin.route";
import adminRouter from "./admin.route";
import testimonialRouter from "./testimonial.routes"; 


const router = Router();

router.use("/auth", authRouter);
router.use('/auth-admin', adminAuthRouter)
router.use("/user", userRouter);
router.use('/admin', adminRouter)
router.use('/subscription', subsriptionRouter)
router.use("/testimonial", testimonialRouter)

export default router;