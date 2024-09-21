import { PrismaClient } from '@prisma/client';
import logger from '../utils/logger';

class PrismaSingleton {
    private static instance: PrismaClient;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient();
            logger.info('Prisma client initialized...');
        }
        return PrismaSingleton.instance;
    }
}

export const prisma = PrismaSingleton.getInstance();
