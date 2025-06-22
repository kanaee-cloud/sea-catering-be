import Joi from "joi";

export const createTestimonialSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  message: Joi.string().min(5).required(),
  rating: Joi.number().min(1).max(5).required(),
});
