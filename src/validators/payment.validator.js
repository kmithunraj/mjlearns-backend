const Joi = require("joi");

const createOrderSchema = Joi.object({
  registrationId: Joi.number().integer().positive().required(),
});

const verifyPaymentSchema = Joi.object({
  registrationId: Joi.number().integer().positive().required(),
  razorpayOrderId: Joi.string().required(),
  razorpayPaymentId: Joi.string().required(),
  razorpaySignature: Joi.string().required(),
});

module.exports = { createOrderSchema, verifyPaymentSchema };
