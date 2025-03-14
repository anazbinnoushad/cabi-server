import express from 'express';
import userAuthRouter from './routes/userAuthRouter';
import tripRouter from './routes/tripRouter';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

app.use('/api/v1/user', userAuthRouter);
app.use('/api/v1/trip', tripRouter);

// Error handler
app.use(errorHandler);

app.listen(3002);
