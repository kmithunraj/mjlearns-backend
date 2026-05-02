const Joi = require("joi");

const createCourseSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
  capacity: Joi.number().integer().min(1).required(),
});

const createWorkshopSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().min(0).required(),
  date: Joi.date().required(),
  capacity: Joi.number().integer().min(1).required(),
});

module.exports = { createCourseSchema, createWorkshopSchema };
