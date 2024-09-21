// src/server.ts
import { prisma } from './prisma/client';
import app from './app';
import { port } from './env';

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});

const shutdown = async (signal: string) => {
    console.log(`Received signal ${signal}. Shutting down...`);

    try {
        await prisma.$disconnect();
        console.log('Prisma client disconnected...');
    } catch (error) {
        console.error('Error disconnecting Prisma client', error);
    }

    server.close((err) => {
        if (err) {
            console.error('Error shutting down server', err);
            process.exit(1);
        }
        console.log('Server closed...');
        process.exit(0);
    });
};

['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => shutdown(signal));
});
