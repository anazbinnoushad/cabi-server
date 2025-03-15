import {z} from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string().optional(),
    password: z.string(),
    dob: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createTripSchema = z.object({
    startOdo: z.number(),
    dayCode: z.string(),
});

export const updateTripSchema = z.object({
    endOdo: z.number().optional(),
    totalEarnings: z.number().optional(),
    fuelExpense: z.number().optional(),
    totalProfit: z.number().optional(),
    poForUser: z.number().optional(),
    poForCompany: z.number().optional(),
});

export const createFuelRecordSchema = z.object({
    tripId: z.number(),
    odoOfRefill: z.number(),
    amount: z.number(),
    type: z.string(),
});
