import Joi from 'joi';

export interface CreateSubscriptionDto {
  userId: number;
  name: string;
  phoneNumber: string;
  planType: 'DIET' | 'PROTEIN' | 'ROYALE';
  mealTypes: string[]; // ['BREAKFAST', 'DINNER']
  deliveryDays: string[]; // ['MONDAY', 'WEDNESDAY']
  allergies?: string;
}

export const createSubscriptionSchema = Joi.object({
  name: Joi.string().max(50).required(),
  phoneNumber: Joi.string().pattern(/^[0-9]{10,20}$/).required(),
  planType: Joi.string().valid('DIET', 'PROTEIN', 'ROYALE').required(),
  mealTypes: Joi.array().items(Joi.string().valid('BREAKFAST', 'LUNCH', 'DINNER')).min(1).required(),
  deliveryDays: Joi.array().items(Joi.string().valid(
    'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'
  )).min(1).required(),
  allergies: Joi.string().allow('', null),
});
