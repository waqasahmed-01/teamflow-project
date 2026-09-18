const express = require("express");

const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createTeamSchema,
  teamIdSchema,
  updateTeamSchema,
} = require("../validators/team.validator");

const {
  create,
  getTeams,
  getTeam,
  update,
  remove,
} = require("../controllers/team.controller");

const router = express.Router();

router.post("/", authenticate, validate(createTeamSchema), create);

router.get("/", authenticate, getTeams);

router.get("/:id", authenticate, validate(teamIdSchema, "params"), getTeam);

router.put(
  "/:id",
  authenticate,
  validate(teamIdSchema, "params"),
  validate(updateTeamSchema, "body"),
  update,
);

router.delete("/:id", authenticate, validate(teamIdSchema, "params"), remove);

module.exports = router;
