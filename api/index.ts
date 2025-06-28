import { PrismaClient } from '@prisma/client';
import app from '../src/index';

const prisma = new PrismaClient();


app.set('prisma', prisma);

export default app;