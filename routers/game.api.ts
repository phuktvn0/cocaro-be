import express from 'express';

import { createProduct } from '../controllers/games/index';
import { protect } from '../middlewares/authentication';
import updateGame from '../controllers/games/updateGame';

const gameRouter: express.Router = express.Router();

gameRouter.post('/', protect, createProduct);

gameRouter.post('/:id', protect, updateGame);

export default gameRouter;
