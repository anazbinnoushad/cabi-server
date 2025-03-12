import express from 'express';
import userAuthRouter from './routes/userAuthRouter';

const app = express();
app.use(express.json())

app.use("/api/v1/user", userAuthRouter)

app.listen(3002)