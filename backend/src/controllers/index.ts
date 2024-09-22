import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';

const pingController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        logger.info('The server is up and running...');

        return res.success({}, 'The server is up and running...');
    } catch (e) {
        next(e);
    }
};

export default pingController;
