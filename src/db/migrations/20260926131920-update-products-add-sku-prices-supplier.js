'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("products", {
     id:{
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true,
       allowNull: false,
     },
     name: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     sku: {
       type: Sequelize.STRING,
       allowNull: false,
       unique: true,
     },
     description: {
       type: Sequelize.TEXT,
       allowNull: true,
     },
     sellingPrice: {
       type: Sequelize.INTEGER,
       allowNull: false,
     },
     purchasePrice:{
       type: Sequelize.INTEGER,
       allowNull: false,
     },
     categoryId: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: "categories",
         key: "id",
       },
     },
     supplierID: {
       type: Sequelize.INTEGER,
       allowNull: false,
       references: {
         model: "suppliers",
         key: "id",
       },
     },
     createdAt: {
       type: Sequelize.DATE,
       allowNull: false,
     },
     updatedAt:{
       type: Sequelize.DATE,
       allowNull: false,
     }
   })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("products");
  }
};
