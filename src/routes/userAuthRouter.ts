import { Router } from 'express';
import { getUserData, login, signUp } from '../controllers/userAuthController';
import { userAuth } from '../middleware/userAuth';

const userAuthRouter = Router();

userAuthRouter.post('/signup', signUp);
userAuthRouter.post('/login', login);
userAuthRouter.get('/me', userAuth, getUserData);

export default userAuthRouter;
