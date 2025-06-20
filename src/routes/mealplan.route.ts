import { Router } from 'express';
import { handleCreateMealplan, handleGetMealplans } from '../controllers/mealplan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware); 
router.post('/', handleCreateMealplan);   
router.get('/', handleGetMealplans);     

export default router;
