import {NextFunction, Request, Response} from 'express';
import prisma from '../db';

export const getAllTrips = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {skip = 0, take = 10} = req.query;
        const trips = await prisma.trip.findMany({
            skip: Number(skip),
            take: Number(take),
            where: {
                userId: req.userId,
            },
        });
        res.status(200).json({
            message: 'Successfully retrieved trips',
            result: trips,
        });
    } catch (err) {
        next(err);
    }
};

export const createTrip = () => {};
export const getTrip = () => {};

export const updateTrip = () => {};
export const deleteTrip = () => {};
