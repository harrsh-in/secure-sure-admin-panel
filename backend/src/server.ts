// src/server.ts
import app from './app';
import { port } from './env';
import { prisma } from './prisma/client';
import logger from './utils/logger';

const server = app.listen(port, () => {
    logger.info(`Server is running on port ${port}...`);
});

const shutdown = async (signal: string) => {
    logger.info(`Received signal ${signal}. Shutting down...`);

    try {
        await prisma.$disconnect();
        logger.info('Prisma client disconnected...');
    } catch (error) {
        console.error('Error disconnecting Prisma client', error);
    }

    server.close((err) => {
        if (err) {
            console.error('Error shutting down server', err);
            process.exit(1);
        }
        logger.info('Server closed...');
        process.exit(0);
    });
};

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => shutdown(signal));
});
