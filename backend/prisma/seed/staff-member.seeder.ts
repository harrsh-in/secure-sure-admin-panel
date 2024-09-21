import { faker } from '@faker-js/faker';
import { PrismaClient, Role } from '@prisma/client';

const staffMemberSeeder = async (prisma: PrismaClient) => {
    try {
        console.log('Seeding staff member...');

        await prisma.user.create({
            data: {
                email: 'staff.member@securesure.in',
                password: 'staff.member',
                roles: [Role.STAFF_MEMBER],
                contact_no: faker.phone.number({
                    style: 'international',
                }),
                staff_member: {
                    create: {},
                },
            },
        });

        console.log('Staff member seeded successfully.');
    } catch (e) {
        console.error(e);
    }
};

export default staffMemberSeeder;
