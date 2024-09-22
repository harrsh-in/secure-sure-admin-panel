import dayjs from 'dayjs';
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { compareString, hashString } from '.';
import { jwtSecret, refreshTokenSecret } from '../env';
import HttpError from '../libs/HttpError';
import { prisma } from '../prisma/client';

const generateAccessToken = ({ id }: { id: string }) => {
    return jwt.sign(
        {
            id,
        },
        jwtSecret,
        {
            expiresIn: '15m',
        }
    );
};

const generateRefreshToken = ({ id }: { id: string }) => {
    return jwt.sign(
        {
            id,
        },
        refreshTokenSecret,
        {
            expiresIn: '7d',
        }
    );
};

const storeRefreshToken = async ({
    refreshToken,
    userId,
    deviceId,
}: {
    userId: string;
    refreshToken: string;
    deviceId: string;
}) => {
    const hashedToken = await hashString(refreshToken);
    const expiresAt = dayjs().add(7, 'day').toDate();

    await prisma.refresh_token.create({
        data: {
            user_id: userId,
            token: hashedToken,
            device_id: deviceId,
            expires_at: expiresAt,
        },
    });
};

const verifyRefreshToken = async ({
    refreshToken,
    deviceId,
    next,
}: {
    refreshToken: string;
    deviceId: string;
    next: NextFunction;
}) => {
    try {
        const refreshTokenRecord = await prisma.refresh_token.findFirst({
            where: {
                device_id: deviceId,
            },
        });
        if (!refreshTokenRecord) {
            throw new HttpError('Please login to continue.', 401);
        }

        const isTokenValid = compareString({
            string: refreshToken,
            hash: refreshTokenRecord.token,
        });
        if (!isTokenValid) {
            throw new HttpError('Please login to continue.', 401);
        }

        const isTokenExpired = dayjs().isAfter(refreshTokenRecord.expires_at);
        if (isTokenExpired) {
            throw new HttpError('Please login to continue.', 401);
        }

        const verifyRefreshToken = jwt.verify(refreshToken, refreshTokenSecret);
        if (!verifyRefreshToken) {
            throw new HttpError('Please login to continue.', 401);
        }

        return refreshTokenRecord;
    } catch (e) {
        await deleteRefreshToken({
            deviceId,
        });
        next(e);
    }
};

const deleteRefreshToken = async ({ deviceId }: { deviceId: string }) => {
    await prisma.refresh_token.deleteMany({
        where: {
            device_id: deviceId,
        },
    });
};

const revokeAllRefreshTokens = async (userId: string) => {
    await prisma.refresh_token.deleteMany({
        where: {
            user_id: userId,
        },
    });
};

const verifyAccessToken = (token: string) => {
    return jwt.verify(token, jwtSecret);
};

export {
    deleteRefreshToken,
    generateAccessToken,
    generateRefreshToken,
    revokeAllRefreshTokens,
    storeRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
