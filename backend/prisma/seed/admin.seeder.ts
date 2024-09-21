import { faker } from '@faker-js/faker';
import { PrismaClient, Role } from '@prisma/client';
import { hashString } from '../../src/utils';

const adminSeeder = async (prisma: PrismaClient) => {
    try {
        console.log('Seeding admin...');

        await prisma.user.create({
            data: {
                email: 'admin@securesure.in',
                password: await hashString('admin'),
                roles: [Role.ADMIN],
                contact_no: faker.phone.number({
                    style: 'international',
                }),
                admin: {
                    create: {},
                },
            },
        });

        await prisma.user.create({
            data: {
                email: 'jaina@securesure.in',
                password: await hashString('admin'),
                roles: [Role.ADMIN],
                contact_no: faker.phone.number({
                    style: 'international',
                }),
                admin: {
                    create: {},
                },
            },
        });

        console.log('Admin seeded successfully.');
    } catch (e) {
        console.error(e);
    }
};

export default adminSeeder;
