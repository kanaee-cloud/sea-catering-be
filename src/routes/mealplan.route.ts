import { Router } from "express";
import { handleGetMealplanDetail, handleGetMealplans } from "../controllers/mealplan.controller";

const router = Router();

router.get('/', handleGetMealplans); 
router.get('/:id', handleGetMealplanDetail);    

export default router;