import { faker } from '@faker-js/faker';
import { PrismaClient, Role } from '@prisma/client';

const customerSeeder = async (prisma: PrismaClient) => {
    try {
        console.log('Seeding customer...');

        await prisma.user.create({
            data: {
                email: 'customer@securesure.in',
                password: 'customer',
                roles: [Role.CUSTOMER],
                contact_no: faker.phone.number({
                    style: 'international',
                }),
                customer: {
                    create: {},
                },
            },
        });

        console.log('Customer seeded successfully.');
    } catch (e) {
        console.error(e);
    }
};

export default customerSeeder;
