import { Router } from 'express';
import { handleCreateSubscription, handleGetSubscriptions } from '../controllers/subscription.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware); 
router.post('/', handleCreateSubscription);
router.get('/', handleGetSubscriptions);

export default router;