import { Router } from 'express';
import { registerAdminController, loginAdminController, logoutAdminController } from '../controllers/admin.controller';
import { adminMiddleware } from '../middlewares/admin.middleware';

const router = Router();

router.post('/register', registerAdminController);
router.post('/login', loginAdminController);
router.post('/logout', adminMiddleware, logoutAdminController);

export default router;

