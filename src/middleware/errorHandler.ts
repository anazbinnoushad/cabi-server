import { Request, Response } from 'express';

interface CustomError extends Error {
    status?: number;
}

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
    const statusCode = err.status || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};
