import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../../libs/HttpError';
import { prisma } from '../../prisma/client';
import { compareString, generateUniqueDeviceId } from '../../utils';
import {
    generateAccessToken,
    generateRefreshToken,
    storeRefreshToken,
} from '../../utils/token';
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

        const accessToken = generateAccessToken({
            id: admin.id,
        });
        const refreshToken = generateRefreshToken({
            id: admin.id,
        });
        const deviceId = generateUniqueDeviceId();

        await storeRefreshToken({
            refreshToken,
            deviceId,
            userId: admin.id,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 15,
        });

        res.cookie('deviceId', deviceId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7,
        });

        return res.success({});
    } catch (e) {
        next(e);
    }
};

export default adminLoginController;
