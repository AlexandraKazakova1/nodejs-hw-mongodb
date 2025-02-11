import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
