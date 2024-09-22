import { Role } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { nodeEnv } from '../env';
import HttpError from '../libs/HttpError';
import { prisma } from '../prisma/client';
import {
    generateAccessToken,
    verifyAccessToken,
    verifyRefreshToken,
} from '../utils/token';

const authenticateUserMiddleware =
    (roles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                throw new HttpError('Please login to continue.', 401);
            }

            let decodedAccessToken: string | JwtPayload = '';
            try {
                decodedAccessToken = verifyAccessToken(accessToken);
            } catch (e) {
                if (e instanceof jwt.TokenExpiredError) {
                    const refreshToken = req.cookies.refreshToken;
                    const deviceId = req.cookies.deviceId;
                    if (!refreshToken || !deviceId) {
                        throw new HttpError('Please login to continue.', 401);
                    }

                    try {
                        const decodedRefreshToken = await verifyRefreshToken({
                            refreshToken,
                            deviceId,
                            next,
                        });
                        const userId = (decodedRefreshToken as any).user_id;

                        const newAccessToken = generateAccessToken({
                            id: userId,
                        });

                        res.cookie('accessToken', newAccessToken, {
                            httpOnly: true,
                            secure: nodeEnv === 'production',
                            sameSite: 'strict',
                            maxAge: 1000 * 60 * 15,
                        });

                        req.userId = userId;
                        return next();
                    } catch (e) {
                        return next(e);
                    }
                } else {
                    return next(e);
                }
            }

            if (!decodedAccessToken) {
                throw new HttpError('Please login to continue.', 401);
            }

            const userId = (decodedAccessToken as any).id;

            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
                    deleted_at: null,
                    roles: {
                        hasSome: roles,
                    },
                },
                select: {
                    id: true,
                },
            });

            if (!user) {
                throw new HttpError(
                    'You are not authorized. Please verify your credentials.',
                    401
                );
            }

            req.userId = user.id;
            next();
        } catch (e) {
            next(e);
        }
    };

export default authenticateUserMiddleware;

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}
