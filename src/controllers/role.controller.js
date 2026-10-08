const createRole = require("../services/role.service");

const createRoleController = async (req, res) => {
  try {
    const { name, description, permissionIds } = req.body;
       if (!name || !Array.isArray(permissionIds)) {
      return res.status(400).json({
        message: "Name and permissionIds are required",
      });
    }
    const response = await createRole(name, description, permissionIds);
    return res
      .status(201)
      .json({ message: "Role created successfully", data: response });
  } catch (error) {
        console.error("CREATE ROLE ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createRoleController };