import { Admin, PrismaClient } from "@prisma/client";
import { createError } from "../exceptions/error.exception";
import { logger } from "../utils/logging.utils";
import { deleteToken } from '../services/token.service';
import { hashPassword } from "../utils/auth.utils";

const prisma = new PrismaClient();

interface DateFilter {
  startDate?: Date;
  endDate?: Date;
}

export const createAdmin = async (
    username: string,
    email: string,
    password: string
) => {
    if (
        await prisma.admin.findUnique({ where: { email }})
    ) {
        throw createError("failed", "Email already exists", 400)
    }

    const hashedPassword = await hashPassword(password);
    logger.info(`Password hashed`);

     return prisma.admin.create({
        data: {
            username,
            password: hashedPassword,
            email
        }
    })
}



export const getAdmin = async (
    where: Partial<Pick<Admin, 'id' | 'email'>>
) => {

    const admins = await prisma.admin.findFirst({ where })

    if (!admins) {
        throw createError("failed", "Admin Not Found, please register first", 400)
    }
    logger.info("Admin Found")

    return admins;
}

export const getDashboardStats = async ({ startDate, endDate }: DateFilter) => {
  const dateFilter = startDate && endDate
    ? { gte: startDate, lte: endDate }
    : undefined;

  
  const newSubscriptions = await prisma.subscription.count({
    where: {
      createdAt: dateFilter,
    },
  });

 
  const activeMRR = await prisma.subscription.aggregate({
    _sum: {
      totalPrice: true,
    },
    where: {
      status: "ACTIVE",
      createdAt: dateFilter, 
    },
  });

 
  const reactivations = await prisma.subscription.count({
    where: {
      resumeAt: dateFilter,
    },
  });

  
  const subscriptionGrowth = await prisma.subscription.count({
    where: {
      status: "ACTIVE",
    },
  });

  return {
    newSubscriptions,
    MRR: activeMRR._sum.totalPrice || 0,
    reactivations,
    subscriptionGrowth,
  };
}

export const logoutAdmin = async (token: string) => {
    await deleteToken(token);

    return {
        message: "Logged out successfully"
    }
}
