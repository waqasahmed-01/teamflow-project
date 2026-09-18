const Team = require("../models/team.model");
const TeamMember = require("../models/TeamMember");

const getTeamMemberRole = async (teamId, userId) => {
  // Check if user is the team owner
  const team = await Team.findOne({
    _id: teamId,
    owner: userId,
  });

  if (team) {
    return "owner";
  }

  // Check if user is a team member
  const teamMember = await TeamMember.findOne({
    team: teamId,
    user: userId,
  });

  if (!teamMember) {
    const error = new Error("You are not a member of this team");
    error.statusCode = 403;
    throw error;
  }

  return teamMember.role;
};

module.exports = {
  getTeamMemberRole,
};
