import express from 'express';

import { createGame, updateGame } from '../controllers/games/index';
import { protect } from '../middlewares/authentication';

const gameRouter: express.Router = express.Router();

gameRouter.post('/', protect, createGame);

gameRouter.post('/:id', protect, updateGame);

export default gameRouter;
