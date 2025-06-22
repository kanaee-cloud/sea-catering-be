import { PrismaClient } from "@prisma/client";
import { createError } from "../exceptions/error.exception";

const prisma = new PrismaClient();

export const createTestimonial = async (
  name: string,
  message: string,
  rating: number
) => {
  try {
    return await prisma.testimonial.create({
      data: { name, message, rating },
    });
  } catch (error) {
    throw createError("fail", "Failed to submit testimonial", 500);
  }
};

export const getTestimonials = async () => {
  return await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });
};
