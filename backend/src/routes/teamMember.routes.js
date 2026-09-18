const express = require("express");

const router = express.Router();

const authenticate = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const { teamIdSchema } = require("../validators/team.validator");

const authorize = require("../middlewares/authorize");

const {
  addMemberSchema,
  changeMemberRoleSchema,
  memberRoleParamsSchema,
} = require("../validators/teamMember.validator");

const {
  add,
  getAll,
  changeRole,
  remove,
} = require("../controllers/teamMember.controller");

//Handlers...
router.post(
  "/:id/members",
  authenticate,
  validate(teamIdSchema, "params"),
  authorize("member.add"),
  validate(addMemberSchema, "body"),
  add,
);

router.get(
  "/:id/members",
  authenticate,
  validate(teamIdSchema, "params"),
  authorize("member.view"),
  getAll,
);

router.put(
  "/:id/members/:userId/role",
  authenticate,
  validate(memberRoleParamsSchema, "params"),
  authorize("member.role.update"),
  validate(changeMemberRoleSchema, "body"),
  changeRole,
);

router.delete(
  "/:id/members/:userId",
  authenticate,
  validate(memberRoleParamsSchema, "params"),
  authorize("member.remove"),
  remove,
);

module.exports = router;
