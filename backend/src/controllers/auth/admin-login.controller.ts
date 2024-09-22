import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../../libs/HttpError';
import { prisma } from '../../prisma/client';
import { compareString } from '../../utils';
import { saveLoginCookies } from './handle-cookies';
import { AdminLoginRequestBody } from './requests';

const adminLoginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email, password } = req.body as AdminLoginRequestBody;

        const admin = await prisma.user.findFirst({
            where: {
                email,
                roles: {
                    has: Role.ADMIN,
                },
            },
        });
        if (
            !admin ||
            !compareString({
                string: password,
                hash: admin.password,
            })
        ) {
            throw new HttpError(
                'Incorrect credentials. Please verify your credentials and try again.'
            );
        }

        await saveLoginCookies(res, admin.id);

        return res.success({});
    } catch (e) {
        next(e);
    }
};

export default adminLoginController;
