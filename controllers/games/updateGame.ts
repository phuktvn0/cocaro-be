import express from 'express';
import createError from 'http-errors';
import httpStatus from 'http-status';

import { updateGameBodySchema } from './game.validators';
import Game from '../../models/Game';

export default async function updateGame(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    delete req.body.userId;
    const { error, value } = updateGameBodySchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      throw createError(httpStatus.BAD_REQUEST, error.message);
    }
    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { $set: value },
      { new: true, runValidators: true },
    );

    if (!updatedGame) {
      return next(createError(httpStatus.NOT_FOUND, 'Game not found'));
    }

    res.json(updatedGame);
  } catch (err) {
    next(err);
  }
}
