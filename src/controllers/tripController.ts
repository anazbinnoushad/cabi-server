import {NextFunction, Request, Response} from 'express';
import prisma from '../db';
import {createTripSchema} from '../types/zodSchema';

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

export const createTrip = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {success, error, data} = createTripSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({message: 'Bad request', error: error});
        return;
    }

    try {
        const userId = req.userId as number;
        const {startOdo, dayCode} = data;
        const currentTime = new Date().toISOString();
        const response = await prisma.trip.create({
            data: {
                userId: userId,
                date: currentTime,
                dayCode: dayCode,
                startOdo: startOdo,
                startTime: currentTime,
                status: STATUS.ONRIDE,
            },
        });

        if (response) {
            res.status(200).json({message: 'Successfully Started!'});
            console.log(response);
        } else {
            throw new Error('Could not able to start journey!');
        }
    } catch (err) {
        next(err);
    }
};
export const getTrip = () => {};

export const updateTrip = () => {};
export const deleteTrip = () => {};
