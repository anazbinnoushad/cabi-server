import {Router} from 'express';
import {
    getFuelRecord,
    createFuelRecord,
    deleteFuelRecord,
} from '../controllers/fuelController';
import {userAuth} from '../middleware/userAuth';

const fuelRouter = Router();

fuelRouter.get('/', userAuth, getFuelRecord);
fuelRouter.post('/', userAuth, createFuelRecord);
fuelRouter.post('/:id', userAuth, deleteFuelRecord);

export default fuelRouter;
