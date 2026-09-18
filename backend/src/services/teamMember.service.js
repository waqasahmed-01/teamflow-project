const Team = require("../models/team.model");
const User = require("../models/user.model");
const TeamMember = require("../models/TeamMember");

const addMember = async (teamId, requesterId, userId) => {
  const team = await Team.findById(teamId);

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const existingMember = await TeamMember.findOne({
    team: teamId,
    user: userId,
  });

  if (existingMember) {
    const error = new Error("User is already a member");
    error.statusCode = 409;
    throw error;
  }

  const member = await TeamMember.create({
    team: teamId,
    user: userId,
    role: "member",
  });

  return member;
};

//Get Members
const getMembers = async (teamId, requesterId) => {
  // Check if requester owns the team
  const team = await Team.findById(teamId);

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }
  // Get all members of the team
  const members = await TeamMember.find({
    team: teamId,
  }).populate("user", "name email avatar");

  return members;
};

//Change member Role
const changeMemberRole = async (teamId, requesterId, userId, role) => {
  // Check if requester owns the team
  const team = await Team.findOne({
    _id: teamId,
    owner: requesterId,
  });

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }

  // Find the member
  const member = await TeamMember.findOne({
    team: teamId,
    user: userId,
  });

  if (!member) {
    const error = new Error("Team member not found");
    error.statusCode = 404;
    throw error;
  }

  // Update role
  member.role = role;

  await member.save();

  return member;
};

//Remove
const removeMember = async (teamId, requesterId, userId) => {
  // Check if requester owns the team
  const team = await Team.findById(teamId);

  if (!team) {
    const error = new Error("Team not found");
    error.statusCode = 404;
    throw error;
  }

  // Find and remove the member
  const member = await TeamMember.findOneAndDelete({
    team: teamId,
    user: userId,
  });

  if (!member) {
    const error = new Error("Team member not found");
    error.statusCode = 404;
    throw error;
  }

  return member;
};

module.exports = {
  addMember,
  getMembers,
  changeMemberRole,
  removeMember,
};
