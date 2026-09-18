const permissions = require("../config/permissions");
const { getTeamMemberRole } = require("../services/authorization.service");

const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const teamId = req.params.id;
      const userId = req.user.userId;

      const role = await getTeamMemberRole(teamId, userId);

      const rolePermissions = permissions[role];

      if (!rolePermissions) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      if (!rolePermissions.includes(requiredPermission)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = authorize;
