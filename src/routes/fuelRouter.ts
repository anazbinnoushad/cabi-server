import { Router } from 'express';
import {
    getAllFuelRecord,
    createFuelRecord,
    deleteFuelRecord,
} from '../controllers/fuelController';
import { userAuth } from '../middleware/userAuth';

const fuelRouter = Router();

fuelRouter.get('/', userAuth, getAllFuelRecord);
fuelRouter.post('/', userAuth, createFuelRecord);
fuelRouter.post('/:id', userAuth, deleteFuelRecord);

export default fuelRouter;
