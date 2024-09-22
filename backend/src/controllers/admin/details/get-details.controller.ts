import { NextFunction, Request, Response } from 'express';
import { prisma } from '../../../prisma/client';

const adminGetDetailsController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const userId = req.userId;

        const userDetails = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
                email: true,
                name: true,
                roles: true,
            },
        });

        return res.success(userDetails);
    } catch (e) {
        next(e);
    }
};

export default adminGetDetailsController;
