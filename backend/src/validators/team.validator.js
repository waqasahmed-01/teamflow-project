const Joi = require("joi");

const createTeamSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().max(500).allow("").optional(),
}).required();

//Validation for object ids.
const teamIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

//Updating Teams.
const updateTeamSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "name is required",
    "any.required": "name is required",
    "string.min": "name must be at least 2 characters",
    "string.max": "name must not exceed 100 characters",
  }),

  description: Joi.string().trim().max(500).allow("").required().messages({
    "any.required": "description is required",
    "string.max": "description must not exceed 500 characters",
  }),
});

module.exports = {
  createTeamSchema,
  teamIdSchema,
  updateTeamSchema,
};
