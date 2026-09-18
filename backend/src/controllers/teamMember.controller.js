const {
  addMember,
  getMembers,
  changeMemberRole,
  removeMember,
} = require("../services/teamMember.service");

const add = async (req, res, next) => {
  try {
    const member = await addMember(
      req.params.id,
      req.user.userId,
      req.body.userId,
    );

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: {
        id: member._id,
        team: member.team,
        user: member.user,
        role: member.role,
        joinedAt: member.joinedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Get Members
const getAll = async (req, res, next) => {
  try {
    const members = await getMembers(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Team members retrieved successfully",
      data: members,
    });
  } catch (error) {
    next(error);
  }
};

//Change Role
const changeRole = async (req, res, next) => {
  try {
    const member = await changeMemberRole(
      req.params.id,
      req.user.userId,
      req.params.userId,
      req.body.role,
    );

    res.status(200).json({
      success: true,
      message: "Member role updated successfully",
      data: {
        id: member._id,
        team: member.team,
        user: member.user,
        role: member.role,
        joinedAt: member.joinedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Remove
const remove = async (req, res, next) => {
  try {
    await removeMember(req.params.id, req.user.userId, req.params.userId);

    res.status(200).json({
      success: true,
      message: "Team member removed successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  add,
  getAll,
  changeRole,
  remove,
};
