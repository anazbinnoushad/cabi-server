import { NextFunction, Request, Response } from 'express';
import prisma from '../db';
import { createTripSchema, updateTripSchema } from '../types/zodSchema';
import { STATUS } from '../types/allTypes';

export const getAllTrips = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { skip = 0, take = 10 } = req.query;
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
    const { success, error, data } = createTripSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({ message: 'Bad request', error: error });
        return;
    }

    try {
        const userId = req.userId as number;
        const { startOdo, dayCode } = data;
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
            res.status(200).json({ message: 'Successfully Started!' });
            console.log(response);
        } else {
            throw new Error('Could not able to start journey!');
        }
    } catch (err) {
        next(err);
    }
};

export const getTrip = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.params.id;
        const trip = await prisma.trip.findFirst({
            where: { userId: req.userId, id: Number(id) },
        });
        res.status(200).send({
            message: 'Successfully retrieved trip',
            result: trip,
        });
    } catch (err) {
        next(err);
    }
};

export const updateTrip = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { success, error, data } = updateTripSchema.safeParse(req.body);
    const id = req.params.id;
    if (!success) {
        res.status(400).json({ message: 'Bad request', error: error });
        return;
    }

    try {
        const currentTime = new Date();
        const addOnFields = {
            endTime: currentTime.toISOString(),
            status: STATUS.COMPLETED,
            totalOdo: Number(data.endOdo - data.startOdo),
            duration: Math.floor(
                (currentTime.getTime() - new Date(data.startTime).getTime()) /
                    1000,
            ),
        };

        const response = await prisma.trip.update({
            where: { id: Number(id) },
            data: {
                ...data,
                ...addOnFields,
            },
        });
        if (response) {
            res.status(200).json({ message: 'Successfully Updated!' });
            console.log(response);
        } else {
            throw new Error('Could not able to update!');
        }
    } catch (err) {
        next(err);
    }
};

export const deleteTrip = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.params.id;
        const trip = await prisma.trip.delete({
            where: { id: Number(id) },
        });
        res.status(200).send({
            message: 'Successfully deleted trip',
        });
    } catch (err) {
        next(err);
    }
};

export const getByDayCode = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const dayCode = req.params.dayCode;
        const userId = req.userId;

        const trip = await prisma.trip.findFirst({
            where: { userId: userId, dayCode: dayCode },
            include: { fuel: true },
        });
        res.status(200).send({
            message: 'Successfully retrived trip',
            result: trip,
        });
    } catch (err) {
        next(err);
    }
};
