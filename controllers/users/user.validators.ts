import Joi from 'joi';

export const loginUserBodySchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const createUserBodySchema = Joi.object({
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .required(),
});

export const userIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

export const updateUserBodySchema = Joi.object({
  oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});
