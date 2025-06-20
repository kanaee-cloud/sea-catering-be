import { PrismaClient } from "@prisma/client";
import { CreateSubscriptionDto } from "../dtos/subscription.dtos";
import { calculateTotalPrice } from "../utils/subscription.utils";
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logging.utils";

const prisma = new PrismaClient();

export const createSubscription = async (
  data: CreateSubscriptionDto,
  userId: number
) => {
  try {
    const { name, phoneNumber, planType, mealTypes, deliveryDays, allergies } =
      data;

    const totalPrice = calculateTotalPrice(
      planType,
      mealTypes.length,
      deliveryDays.length
    );

    const newSubscription = await prisma.subscription.create({
      data: {
        name,
        phoneNumber,
        planType,
        mealTypes: mealTypes.join(","),
        deliveryDays: deliveryDays.join(","),
        allergies,
        totalPrice,
        userId: userId,
      },
    });

    logger.info("New subscription created", {
      userId,
      subscriptionId: newSubscription.id,
    });

    return newSubscription;
  } catch (error: any) {
    console.error("🔥 Prisma Error Detail:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack,
      userId,
      data,
    });

    logger.error("Error creating subscription", {
      error: error.message,
      userId,
    });

    throw createError("fail", "Failed to create subscription", 500);
  }
};

export const getAllSubscriptions = async () => {
  try {
    return await prisma.subscription.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    logger.error("Error fetching subscriptions", error);
    throw createError("fail", "Failed to fetch subscriptions", 500);
  }
};
