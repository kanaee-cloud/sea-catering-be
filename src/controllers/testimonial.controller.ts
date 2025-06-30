import { Request, Response } from "express";
import { asyncHandler } from "../exceptions/async_handler.exception";
import { createTestimonial, deleteTestimonial, getTestimonials } from "../services/testimonial.service";
import { createTestimonialSchema } from "../dtos/testimonial.dtos";

export const handleCreateTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const { error, value } = createTestimonialSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }

    const { name, message, rating } = value;
    const testimonial = await createTestimonial(name, message, rating);

    res.status(201).json({
      status: "success",
      message: "Testimonial submitted",
      data: testimonial,
    });
  }
);

export const handleDeleteTestimonial = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await deleteTestimonial(id);

    res.status(200).json({
      status: "success",
      message: "Testimonial deleted",
    });
  }
);

export const handleGetTestimonials = asyncHandler(
  async (_req: Request, res: Response) => {
    const testimonials = await getTestimonials();

    res.status(200).json({
      status: "success",
      message: "Fetched all testimonials",
      data: testimonials,
    });
  }
);
