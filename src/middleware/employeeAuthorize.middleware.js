const { Employee, Role, Permission } = require("../models");

const Authorize = (permissionName) => {
  return async (req, res, next) => {
    try {
      const employeeId = req.user.id;

      const employee = await Employee.findByPk(employeeId, {
        include: [
          {
            model: Role,
            as: "role",
            include: [
              {
                model: Permission,
                as: "permissions",
              },
            ],
          },
        ],
      });

      if (!employee || !employee.role) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }

      const hasPermission = employee.role.permissions.some(
        (permission) => permission.name === permissionName
      );

      if (!hasPermission) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
};

module.exports = Authorize;