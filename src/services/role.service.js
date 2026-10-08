const { Role, Permission } = require("../models");
const createRole = async (name, description, permissionIds) => {
  const role = await Role.create({ name, description });
  if (!role) {
    throw new Error("Role not created");
  }
  const permissions = await Permission.findAll({
    where: {
      id: permissionIds,
    },
  });

  if (!permissions || !permissionIds.length) {
    throw new Error("one or more Permissions not found");
  }
  await role.setPermissions(permissions);
  return role;
};

module.exports = createRole;
