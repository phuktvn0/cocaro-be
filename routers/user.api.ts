import express from 'express';
import { createUser, loginUser } from '../controllers/users/index';

const userRouter: express.Router = express.Router();

userRouter.post('/', createUser);

userRouter.post('/login', loginUser);

export default userRouter;
