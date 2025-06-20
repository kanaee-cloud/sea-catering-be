import { PrismaClient } from '@prisma/client';
import { CreateMealplanDto } from '../dtos/mealplan.dtos';
import { logger } from '../utils/logging.utils';
import { createError } from '../exceptions/error.exception';

const prisma = new PrismaClient();

export const createMealplan = async (data: CreateMealplanDto) => {
  try {
    const mealplan = await prisma.mealplan.create({ data });
    logger.info(`Mealplan created: ${mealplan.name}`);
    return mealplan;
  } catch (error) {
    logger.error('Failed to create mealplan', error);
    throw createError('fail', 'Mealplan creation failed', 500);
  }
};

export const getAllMealplans = async () => {
  try {
    return await prisma.mealplan.findMany({ orderBy: { name: 'asc' } });
  } catch (error) {
    logger.error('Failed to fetch mealplans', error);
    throw createError('fail', 'Failed to fetch mealplans', 500 );
  }
};
