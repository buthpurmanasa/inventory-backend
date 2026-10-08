"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'Admin' LIMIT 1`
    );

    const [permissions] = await queryInterface.sequelize.query(
      `SELECT id FROM permissions`
    );

    if (!roles.length) {
      throw new Error("Admin role not found");
    }

    if (!permissions.length) {
      throw new Error("Permissions not found");
    }

    const roleId = roles[0].id;

    await queryInterface.bulkInsert(
      "role_permissions",
      permissions.map((permission) => ({
        roleId,
        permissionId: permission.id,
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'Admin' LIMIT 1`
    );

    if (!roles.length) {
      return;
    }

    await queryInterface.bulkDelete("role_permissions", {
      roleId: roles[0].id,
    });
  },
};