const Joi = require("joi");

const addMemberSchema = Joi.object({
  userId: Joi.string().hex().length(24).required().messages({
    "string.empty": "userId is required",
    "any.required": "userId is required",
    "string.hex": "userId must be a valid ObjectId",
    "string.length": "userId must be a valid ObjectId",
  }),
});

const changeMemberRoleSchema = Joi.object({
  role: Joi.string()
    .valid("admin", "projectManager", "member", "viewer")
    .required()
    .messages({
      "any.only": "role must be admin, projectManager, member, or viewer",
      "any.required": "role is required",
      "string.empty": "role is required",
    }),
});

const memberRoleParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "id must be a valid ObjectId",
    "string.length": "id must be a valid ObjectId",
    "any.required": "id is required",
  }),

  userId: Joi.string().hex().length(24).required().messages({
    "string.hex": "userId must be a valid ObjectId",
    "string.length": "userId must be a valid ObjectId",
    "any.required": "userId is required",
  }),
});

module.exports = {
  addMemberSchema,
  changeMemberRoleSchema,
  memberRoleParamsSchema,
};
