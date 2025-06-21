import { Request, Response } from "express";
import { createMealplanSchema } from "../dtos/mealplan.dtos";
import { createMealplan, getAllMealplans, getMealplanById } from "../services/mealplan.service";
import { asyncHandler } from "../exceptions/async_handler.exception";

export const handleCreateMealplan = asyncHandler(
  async (req: Request, res: Response) => {
    const { error, value } = createMealplanSchema.validate(req.body);
    if (error)
      return res.status(400).json({ status: "fail", message: error.message });

    const meal = await createMealplan(value);
    res
      .status(201)
      .json({
        status: "success",
        message: "Meal Plan created successfully",
        data: meal,
      });
  }
);

export const handleGetMealplanDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const meal = await getMealplanById(id);
    if (!meal) return res.status(404).json({ status: "fail", message: "Meal Plan not found" });
    res
      .status(200)
      .json({
        status: "success",
        message: "Get Meal Plan Detail successfully",
        data: meal,
      });
  }
);

export const handleGetMealplans = asyncHandler(
  async (_req: Request, res: Response) => {
    const plans = await getAllMealplans();
    res
      .status(200)
      .json({
        status: "success",
        message: "Get All Meal Plans successfully",
        data: plans,
      });
  }
);
