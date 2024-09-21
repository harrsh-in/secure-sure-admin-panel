import { PrismaClient } from '@prisma/client';
import adminSeeder from './admin.seeder';
import agentSeeder from './agent.seeder';
import customerSeeder from './customer.seeder';
import staffMemberSeeder from './staff-member.seeder';
import superUserSeeder from './super-user.seeder';

const prisma = new PrismaClient();

const main = async () => {
    console.log('Seeding database...');

    await Promise.allSettled([
        adminSeeder(prisma),
        agentSeeder(prisma),
        customerSeeder(prisma),
        staffMemberSeeder(prisma),
        superUserSeeder(prisma),
    ]);

    console.log('Database seeded successfully.');
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
