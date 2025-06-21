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
    throw createError("fail", "Failed to create subscription", 500);
  }
};

export const getUserSubscription = async (userId: number) => {
  const subscription = await prisma.subscription.findFirst({
    where: { userId },
  });
  return subscription;
};

export const deleteUserSubscription = async (userId: number) => {
  try {
    const subscription = await getUserSubscription(userId);
    if (!subscription) {
      throw createError("fail", "Subscription not found", 404);
    }
    const deletedSubscription = await prisma.subscription.delete({
      where: { id: subscription.id },
    });
    logger.info("Subscription deleted", {
      userId,
      subscriptionId: deletedSubscription.id,
    });
    return deletedSubscription;
  } catch (error) {
    throw createError("fail", "Failed to delete subscription", 500);
  }
};

export const getSubscriptionById = async (id: string) => {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { id },
    });
    if (!subscription) {
      throw createError("fail", "Subscription not found", 404);
    }

    return subscription;
  } catch (error) {
    logger.error("Error fetching subscription detail", error);
    throw createError("fail", "Failed to fetch subscription detail", 500);
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

export const togglePauseSubscription = async (
  userId: number,
  pauseStart?: Date,
  pauseEnd?: Date
) => {
  const subscription = await getUserSubscription(userId);
  console.log("Current subscription:", subscription);

  if (!subscription) {
    throw createError("fail", "Subscription not found", 404);
  }

  if (subscription.status === "PAUSED") {
    return await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        status: "ACTIVE",
        pauseStart: null,
        pauseEnd: null,
      },
    });
  }

  if (!pauseStart) {
    throw createError("fail", "Pause start date is required", 400);
  }

  return await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "PAUSED",
      pauseStart,
      pauseEnd: pauseEnd ?? null,
    },
  });
};

export const resumeUserSubscription = async (userId: number) => {
  const subscription = await getUserSubscription(userId);
  if (!subscription) {
    throw createError("fail", "Subscription not found", 404);
  }

  if (subscription.status !== "PAUSED") {
    throw createError("fail", "Subscription is not paused", 400);
  }

  const updated = await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "ACTIVE",
      pauseStart: null,
      pauseEnd: null,
    },
  });

  logger.info("Subscription resumed", { userId });
  return updated;
};

export const cancelUserSubscription = async (userId: number) => {
  const subscription = await getUserSubscription(userId);
  if (!subscription) {
    throw createError("fail", "Subscription not found", 404);
  }

  return await prisma.subscription.update({
    where: { id: subscription.id },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
    },
  });
};
