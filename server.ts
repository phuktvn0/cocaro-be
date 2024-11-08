// Importing module
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import createError from 'http-errors';
import httpStatus from 'http-status';

import { connect } from './helper';
import userRouter from './routers/user.api';
import gameRouter from './routers/game.api';

const app: express.Application = express();
const PORT: Number = 8000;

mongoose.set('strictQuery', false);
connect();

app.get('/', (req: express.Request, res: express.Response) => {
  res.status(200).send('Welcome to typescript backend!');
});

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/games', gameRouter);
app.use('/api/users', userRouter);

app.use(
  (
    err: createError.HttpError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    res
      .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  },
);

// Server setup
app.listen(PORT, () => {
  console.log(
    'The application is listening ' + 'on port http://localhost:' + PORT,
  );
});

export default app;
