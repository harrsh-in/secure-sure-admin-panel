import { PrismaClient } from '@prisma/client';

class PrismaSingleton {
    private static instance: PrismaClient;

    private constructor() {}

    public static getInstance(): PrismaClient {
        if (!PrismaSingleton.instance) {
            PrismaSingleton.instance = new PrismaClient();
            console.log('Prisma client initialized...');
        }
        return PrismaSingleton.instance;
    }
}

export const prisma = PrismaSingleton.getInstance();
