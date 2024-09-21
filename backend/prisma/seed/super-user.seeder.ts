import { faker } from '@faker-js/faker';
import { PrismaClient, Role } from '@prisma/client';
import { hashString } from '../../src/utils';

const superUserSeeder = async (prisma: PrismaClient) => {
    try {
        console.log('Seeding super user...');

        await prisma.user.create({
            data: {
                email: 'super.user@securesure.in',
                password: await hashString('super.user'),
                roles: [
                    Role.ADMIN,
                    Role.AGENT,
                    Role.CUSTOMER,
                    Role.STAFF_MEMBER,
                ],
                contact_no: faker.phone.number({
                    style: 'international',
                }),
                admin: {
                    create: {},
                },
                agent: {
                    create: {},
                },
                customer: {
                    create: {},
                },
                staff_member: {
                    create: {},
                },
            },
        });

        console.log('Super user seeded successfully.');
    } catch (e) {
        console.error(e);
    }
};

export default superUserSeeder;
