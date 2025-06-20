import { Request, Response } from 'express';
import { createSubscriptionSchema } from '../dtos/subscription.dtos';
import { createSubscription, getAllSubscriptions } from '../services/subscription.service';
import { asyncHandler } from '../exceptions/async_handler.exception';
import { getUserIdFromJWT } from '../utils/auth.utils';
import { logger } from '../utils/logging.utils';




export const handleCreateSubscription = asyncHandler(async (req: Request, res: Response) => {
  const { error, value } = createSubscriptionSchema.validate(req.body);
  const userId = getUserIdFromJWT(req);

  console.log('Validated data:', value);
  console.log('User ID from JWT:', userId);

  if (error) {
    return res.status(400).json({ status: 'fail', message: error.message });
  }

  const subscription = await createSubscription(value, userId);
  res.status(201).json({ status: 'success', data: subscription });
});

export const handleGetSubscriptions = asyncHandler(async (_req: Request, res: Response) => {
  const subscriptions = await getAllSubscriptions();
  res.status(200).json({ status: 'success', data: subscriptions });
});
