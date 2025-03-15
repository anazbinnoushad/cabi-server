import {NextFunction, Request, Response} from 'express';
import prisma from '../db';
import {createFuelRecordSchema} from '../types/zodSchema';

export const getAllFuelRecord = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const {skip = 0, take = 10} = req.query;
        const fuelRecords = await prisma.fuel.findMany({
            skip: Number(skip),
            take: Number(take),
            where: {
                userId: req.userId,
            },
        });
        res.status(200).json({
            message: 'Successfully retrieved fuels',
            result: fuelRecords,
        });
    } catch (err) {
        next(err);
    }
};

export const createFuelRecord = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const {success, data, error} = createFuelRecordSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({message: 'Bad request', error: error});
        return;
    }

    try {
        const currentTime = new Date().toISOString();
        const {odoOfRefill, amount, tripId, type} = data;
        const userId = req.userId as number;
        const response = await prisma.fuel.create({
            data: {
                tripId: tripId,
                userId: userId,
                odoOfRefill: odoOfRefill,
                amount: amount,
                time: currentTime,
                type: type,
            },
        });
        if (response) {
            res.status(200).json({message: 'Successfully saved refill info'});
        } else {
            throw new Error('Could not able save refill info!');
        }
    } catch (err) {
        next(err);
    }
};

export const deleteFuelRecord = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const id = req.params.id;
        const response = await prisma.fuel.delete({
            where: {id: Number(id)},
        });
        if (response) {
            res.status(200).send({
                message: 'Successfully deleted trip!',
            });
        } else {
            throw new Error('Something went wrong!');
        }
    } catch (err) {
        next(err);
    }
};
