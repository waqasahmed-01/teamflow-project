const Team = require("../models/team.model");

const createTeam = async ({ name, description }, ownerId) => {
  const team = await Team.create({
    name,
    description,
    owner: ownerId,
  });

  return team;
};

//Get My Team
const getMyTeams = async (ownerId) => {
  const teams = await Team.find({ owner: ownerId }).sort({ createdAt: -1 });

  return teams;
};

//Get Team By Id
const getTeamById = async (teamId, ownerId) => {
  const team = await Team.findOne({
    _id: teamId,
    owner: ownerId,
  });

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }

  return team;
};

//Update Team
const updateTeam = async (teamId, ownerId, { name, description }) => {
  const team = await Team.findOne({
    _id: teamId,
    owner: ownerId,
  });

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }

  team.name = name;
  team.description = description;

  await team.save();

  return team;
};

//Delete Team
const deleteTeam = async (teamId, ownerId) => {
  const team = await Team.findOneAndDelete({
    _id: teamId,
    owner: ownerId,
  });

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }

  return team;
};

module.exports = {
  createTeam,
  getMyTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
