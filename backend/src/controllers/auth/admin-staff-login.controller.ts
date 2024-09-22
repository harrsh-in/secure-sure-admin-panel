import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../../libs/HttpError';
import { prisma } from '../../prisma/client';
import { compareString } from '../../utils';
import { saveLoginCookies } from './handle-cookies';
import { AdminStaffLoginRequestBody } from './requests';

const adminStaffLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body as AdminStaffLoginRequestBody;

        const adminStaffUser = await prisma.user.findFirst({
            where: {
                email,
                roles: {
                    hasSome: [Role.ADMIN, Role.STAFF_MEMBER],
                },
            },
            select: {
                id: true,
                password: true,
                roles: true,
            },
        });
        if (
            !adminStaffUser ||
            !compareString({
                string: password,
                hash: adminStaffUser.password,
            })
        ) {
            throw new HttpError(
                'Incorrect credentials. Please verify your credentials and try again.'
            );
        }

        await saveLoginCookies(res, adminStaffUser.id);

        return res.success({
            role: adminStaffUser.roles,
        });
    } catch (e) {
        next(e);
    }
};

export default adminStaffLoginController;
