import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../config';

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    const token = authorization?.split(' ')[1];
    console.log(`inauth`, req);

    if (token) {
        const verified = jwt.verify(token, JWT_SECRET) as {id: string};
        if (verified) {
            req.userId = Number(verified.id);
            next();
        } else {
            res.status(401).json({message: 'Failed to authenticate'});
        }
    } else {
        res.status(401).json({message: 'No token found'});
    }
};
