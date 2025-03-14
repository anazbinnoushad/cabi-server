import {Router} from 'express';
import {
    createTrip,
    deleteTrip,
    getAllTrips,
    getTrip,
    updateTrip,
} from '../controllers/tripController';
import {userAuth} from '../middleware/userAuth';

const tripRouter = Router();

tripRouter.get('/', userAuth, getAllTrips);
tripRouter.get('/:id', getTrip);
tripRouter.post('/', userAuth, createTrip);
tripRouter.patch('/:id', updateTrip);
tripRouter.delete('/:id', deleteTrip);

export default tripRouter;
