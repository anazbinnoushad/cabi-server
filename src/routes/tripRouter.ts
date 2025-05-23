import { Router } from 'express';
import {
    createTrip,
    deleteTrip,
    getAllTrips,
    getTrip,
    updateTrip,
    getByDayCode,
    getPreviousTrips,
} from '../controllers/tripController';
import { userAuth } from '../middleware/userAuth';

const tripRouter = Router();

tripRouter.get('/', userAuth, getAllTrips);
tripRouter.get('/dayCode/:dayCode', userAuth, getByDayCode);
tripRouter.get('/previousCompleted', userAuth, getPreviousTrips);
tripRouter.get('/:id', userAuth, getTrip);
tripRouter.post('/', userAuth, createTrip);
tripRouter.patch('/:id', userAuth, updateTrip);
tripRouter.delete('/:id', userAuth, deleteTrip);

export default tripRouter;
