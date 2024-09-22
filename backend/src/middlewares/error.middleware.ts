import { NextFunction, Request, Response } from 'express';
import { removeLoginCookies } from '../controllers/auth/handle-cookies';
import { nodeEnv } from '../env';

const errorHandlerMiddleware = (
    e: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = e.statusCode || 400;
    const message = e.message || 'An unexpected error occurred';

    if (statusCode === 401) {
        removeLoginCookies(res);
    }

    console.error(e);

    res.status(statusCode).json({
        status: 'error',
        message,
        error: nodeEnv === 'development' ? e : undefined,
    });
};

export default errorHandlerMiddleware;
