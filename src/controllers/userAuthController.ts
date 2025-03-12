import { Request, Response } from "express"
import { loginSchema, signUpSchema } from "../types/zodSchema"
import bcrypt from "bcrypt"
import prisma from "../db"

export const signUp = async (req: Request, res: Response) => {
    const { success, error } = signUpSchema.safeParse(req.body)
    if (!success) {
        res.status(400).json({ message: "Bad request", error: error })
        return;
    }

    try {
        const response = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob
            }
        })
        if (response) {
            res.status(200).json({ message: "Successfully signed up" })
        }
    } catch (err) {
        res.status(500).json({
            message: err
        })
    }


}


export const login = async (req: Request, res: Response) => {
    const { success, error } = loginSchema.safeParse(req.body)
    if (!success) {
        res.status(400).json({ message: "Bad request", error: error })
        return;
    }


    try {
        const hashPassword = await bcrypt.hash(req.body.password, 5)
        //  DB Call
        if (true) {
            res.status(200).json({ message: "Signed Up Succesfully" })
        } else {
            throw new Error("Could not sign up")
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }

}