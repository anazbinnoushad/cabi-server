import { z } from "zod"

export const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    phone: z.string().optional(),
    password: z.string().optional(),
    dob: z.string()
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})
