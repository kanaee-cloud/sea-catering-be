import {PrismaClient, Users} from "@prisma/client";
import { hashPassword } from "../utils/auth.utils";
import { createError } from "../exceptions/error.exception";
import {logger} from "../utils/logging.utils";
import {comparePassword} from "../utils/auth.utils";

const prisma = new PrismaClient();

export const createUser = async (
    username: string,
    email: string,
    password: string
) => {
    if (
        await prisma.users.findUnique({ where: { email }})
    ) {
        throw createError("failed", "Email already exists", 400)
    }

    const hashedPassword = await hashPassword(password);
    logger.info(`Password hashed`);

     return prisma.users.create({
        data: {
            username,
            password: hashedPassword,
            email
        }
    })
}

export const getUser = async (
    where: Partial<Pick<Users, 'id' | 'email'>>
) => {

    const user = await prisma.users.findFirst({ where })

    if (!user) {
        throw createError("failed", "User Not Found, please register first", 400)
    }
    logger.info("User Found")

    return user
}