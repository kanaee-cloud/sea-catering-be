import { Request, Response } from 'express';
import { createMealplanSchema } from '../dtos/mealplan.dtos';
import { createMealplan, getAllMealplans } from '../services/mealplan.service';
import { asyncHandler } from '../exceptions/async_handler.exception';

export const handleCreateMealplan = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = createMealplanSchema.validate(req.body);
  if (error) return res.status(400).json({ status: 'fail', message: error.message });

  const created = await createMealplan(value);
  res.status(201).json({ status: 'success', data: created });
});

export const handleGetMealplans = asyncHandler(async (_req: Request, res: Response) => {
  const plans = await getAllMealplans();
  res.status(200).json({ status: 'success', data: plans });
});
