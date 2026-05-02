const Joi = require("joi");

const registrationSchema = Joi.object({
  courseId: Joi.number().integer().positive(),
  workshopId: Joi.number().integer().positive(),
}).xor("courseId", "workshopId");

module.exports = { registrationSchema };
