const Joi = require("joi");

const passwordSchema = Joi.string().min(8).max(128).required();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordSchema,
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
