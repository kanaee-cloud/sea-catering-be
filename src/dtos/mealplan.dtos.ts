import Joi from 'joi';

export interface CreateMealplanDto {
  name: 'Diet' | 'Protein' | 'Royale';
  description?: string;
  price: number;
  imageUrl?: string;
}

export const createMealplanSchema = Joi.object({
  name: Joi.string().valid('Diet', 'Protein', 'Royale').required(),
  description: Joi.string().allow('', null),
  price: Joi.number().positive().required(),
  imageUrl: Joi.string().uri().optional(),
});
