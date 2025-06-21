import { Router } from 'express';
import { handleCreateMealplan, handleGetMealplanDetail, handleGetMealplans } from '../controllers/mealplan.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.use(authMiddleware); 
router.post('/', handleCreateMealplan);   
router.get('/', handleGetMealplans); 
router.get('/:id', handleGetMealplanDetail);    

export default router;
