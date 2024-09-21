import { faker } from '@faker-js/faker';
import { PrismaClient, Role } from '@prisma/client';

const agentSeeder = async (prisma: PrismaClient) => {
    try {
        console.log('Seeding agent...');

        await prisma.user.create({
            data: {
                email: 'agent@securesure.in',
                password: 'agent',
                roles: [Role.AGENT],
                contact_no: faker.phone.number({
                    style: 'international',
                }),
                agent: {
                    create: {},
                },
            },
        });

        console.log('Agent seeded successfully.');
    } catch (e) {
        console.error(e);
    }
};

export default agentSeeder;
