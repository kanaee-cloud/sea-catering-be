import { PrismaClient } from "@prisma/client";
import { generateRefreshToken, verifyRefreshToken } from "../utils/auth.utils";
import { createError } from "../exceptions/error.exception";
import { ref } from "joi";
// import { create } from "domain";

const prisma = new PrismaClient()

export const createRefreshToken = async (userId: number) => {
     const refreshToken = await prisma.refreshToken.create({
          data: {
               userId: userId,
               token: generateRefreshToken(userId),
               expiredAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          }
     })

     return refreshToken.token;
}

export const getToken = async (token: string) => {
     const refreshToken = await prisma.refreshToken.findFirst({
          where: {
               token: token
          }
     })

     if (!refreshToken) {
          throw createError("failed", "Token Not Found", 400)
     }

     return refreshToken
}

export const deleteToken = async (token: string) => {
     if(!await getToken(token)) {
          throw createError("failed", "Logout failed, token invalid", 400)
     }

     return prisma.refreshToken.delete({
          where: {
               token
          }
     })
}

export const validateRefreshToken = async (token: string) => {
     if(!token) {
          throw createError("failed", "Refresh Token Required", 400)
     }

     if(!verifyRefreshToken(token)) {
          throw createError("failed", "Refresh Token Invalid", 400)
     }

     const refreshToken = await getToken(token)

     if (refreshToken){
          if (new Date(Date.now()) > refreshToken?.expiredAt) {
               throw createError("failed", "Refresh Token Expired", 400)
          }
     }

     return
}