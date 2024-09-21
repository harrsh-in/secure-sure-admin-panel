import { NextFunction, Request, Response } from 'express';

const errorHandlerMiddleware = (
    e: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = e.statusCode || 400;
    const message = e.message || 'An unexpected error occurred';

    console.error(e);

    res.status(statusCode).json({
        status: 'error',
        message,
        error: process.env.NODE_ENV === 'development' ? e : undefined,
    });
};

export default errorHandlerMiddleware;
