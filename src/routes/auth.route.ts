import { Router } from "express";
import { loginController, logout, registerController } from "../controllers/user.controller";
import { validateDTO } from "../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema } from "../dtos/user.dtos";
import { refreshToken } from "../controllers/token.controller";

const router = Router();

router.post("/register", validateDTO(registerUserSchema), registerController);
router.post("/login", validateDTO(loginUserSchema), loginController);
router.get("/refresh-token", refreshToken)
router.delete("/logout", logout)

export default router;