const {
  createTeam,
  getMyTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
} = require("../services/team.service");

const create = async (req, res, next) => {
  try {
    const team = await createTeam(req.body, req.user.userId);

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: {
        id: team._id,
        name: team.name,
        description: team.description,
        owner: team.owner,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Get Teams
const getTeams = async (req, res, next) => {
  try {
    const teams = await getMyTeams(req.user.userId);

    res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      data: teams.map((team) => ({
        id: team._id,
        name: team.name,
        description: team.description,
        owner: team.owner,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      })),
    });
  } catch (error) {
    next(error);
  }
};

//Get Single Team by id
const getTeam = async (req, res, next) => {
  try {
    const team = await getTeamById(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Team retrieved successfully",
      data: {
        id: team._id,
        name: team.name,
        description: team.description,
        owner: team.owner,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Update Team
const update = async (req, res, next) => {
  try {
    const team = await updateTeam(req.params.id, req.user.userId, req.body);

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: {
        id: team._id,
        name: team.name,
        description: team.description,
        owner: team.owner,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

//Delete Team
const remove = async (req, res, next) => {
  try {
    await deleteTeam(req.params.id, req.user.userId);

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getTeams,
  getTeam,
  update,
  remove,
};
