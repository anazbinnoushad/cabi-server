import { Router } from "express";
import { login, signUp } from "../controllers/userController";

const userAuthRouter = Router()

userAuthRouter.post("/signup", signUp)
userAuthRouter.post("/login", login)

export default userAuthRouter