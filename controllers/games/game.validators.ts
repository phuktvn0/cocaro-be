import Joi from 'joi';

export const createGameBodySchema = Joi.object({
  userId: Joi.string().hex().length(24),
});

export const gameIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

export const updateGameBodySchema = Joi.object({
  move: Joi.object().pattern(
    Joi.string(),
    Joi.array()
      .ordered(
        Joi.number().required(),
        Joi.number().required(),
        Joi.string().valid('x', 'o').required(),
      )
      .length(3),
  ),
  result: Joi.string().valid('win', 'lose', 'draw').allow(null),
});
