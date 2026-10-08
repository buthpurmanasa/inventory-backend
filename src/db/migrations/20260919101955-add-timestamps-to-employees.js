module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("role_permissions", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });

    await queryInterface.addColumn("role_permissions", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("NOW"),
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("role_permissions", "createdAt");
    await queryInterface.removeColumn("role_permissions", "updatedAt");
  },
};