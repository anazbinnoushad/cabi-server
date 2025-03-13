import { Request, Response } from "express"
import { loginSchema, signUpSchema } from "../types/zodSchema"
import bcrypt from "bcrypt"
import prisma from "../db"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

export const signUp = async (req: Request, res: Response) => {
    const { success, error } = signUpSchema.safeParse(req.body)
    if (!success) {
        res.status(400).json({ message: "Bad request", error: error })
        return;
    }

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 5)
        const response = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                dob: req.body.dob,
                password: hashPassword
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
        const foundUser = await prisma.user.findFirst({ where: { email: req.body.email } })
        if (foundUser) {
            const verified = await bcrypt.compare(req.body.password, foundUser.password);
            if (!verified) {
                throw new Error("Incorrect password")
            }
            const token = jwt.sign({ id: foundUser.id }, JWT_SECRET)
            res.status(200).json({ message: "Successfully logged in", token: token })
        } else {
            throw new Error("Could not find user")
        }
    } catch (err) {
        res.status(500).json({ message: err })
    }

}