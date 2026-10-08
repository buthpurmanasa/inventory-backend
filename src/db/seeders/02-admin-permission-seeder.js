"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const permissions = [
      "CREATE_EMPLOYEE",
      "READ_EMPLOYEE",
      "UPDATE_EMPLOYEE",
      "DELETE_EMPLOYEE",

      "CREATE_ROLE",
      "READ_ROLE",
      "UPDATE_ROLE",
      "DELETE_ROLE",

      "CREATE_PERMISSION",
      "READ_PERMISSION",
      "UPDATE_PERMISSION",
      "DELETE_PERMISSION",

      "CREATE_CATEGORY",
      "READ_CATEGORY",
      "UPDATE_CATEGORY",
      "DELETE_CATEGORY",

      "CREATE_PRODUCT",
      "READ_PRODUCT",
      "UPDATE_PRODUCT",
      "DELETE_PRODUCT",

      "CREATE_SUPPLIER",
      "READ_SUPPLIER",
      "UPDATE_SUPPLIER",
      "DELETE_SUPPLIER",

      "CREATE_PURCHASE",
      "READ_PURCHASE",
      "UPDATE_PURCHASE",
      "DELETE_PURCHASE",

      "CREATE_WAREHOUSE",
      "READ_WAREHOUSE",
      "UPDATE_WAREHOUSE",
      "DELETE_WAREHOUSE",

      "CREATE_STOCK",
      "READ_STOCK",
      "UPDATE_STOCK",
      "DELETE_STOCK",
    ];

    await queryInterface.bulkInsert(
      "permissions",
      permissions.map((name) => ({
        name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};