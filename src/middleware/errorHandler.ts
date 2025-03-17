import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = err.status || 500;

    if (req.path.startsWith('/api/v1/user')) {
        return next();
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
