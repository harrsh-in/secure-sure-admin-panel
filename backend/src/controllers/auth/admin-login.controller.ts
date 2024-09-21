import { NextFunction, Request, Response } from 'express';
import { AdminLoginRequestBody } from './requests';
import { prisma } from '../../prisma/client';
import { Role } from '@prisma/client';
import HttpError from '../../libs/HttpError';
import { compareString } from '../../utils';

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
        if (!admin) {
            throw new HttpError(
                'Incorrect credentials. Please verify your credentials and try again.'
            );
        }

        const isPasswordValid = compareString({
            string: password,
            hash: admin.password,
        });
        if (!isPasswordValid) {
            throw new HttpError(
                'Incorrect credentials. Please verify your credentials and try again.'
            );
        }

        return res.success({});
    } catch (e) {
        next(e);
    }
};

export default adminLoginController;
