import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';

import Game from '../../models/Game';
import { createGameBodySchema } from './game.validators';

export default async function createGame(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const { error } = createGameBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }

    const game = new Game({
      move: {},
      result: null,
      userId: req.body.userId,
    });

    const createdGame = await game.save();
    res.status(201).json(createdGame);
  } catch (err) {
    next(err);
  }
}
