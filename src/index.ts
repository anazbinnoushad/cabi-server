import express from 'express';
import userAuthRouter from './routes/userAuthRouter';
import tripRouter from './routes/tripRouter';

const app = express();
app.use(express.json())

app.use("/api/v1/user", userAuthRouter)
app.use("/api/v1/trip", tripRouter)


app.listen(3002)