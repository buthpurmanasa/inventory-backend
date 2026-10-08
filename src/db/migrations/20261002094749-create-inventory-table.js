"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("inventory", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      warehouseId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouse",
          key: "id",
        },
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      available: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      reserved: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      min: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "In Stock",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    
    },
    {
        indexes: [
        {
          unique: true,
          fields: ["productId", "warehouseId"],
        },
      ],
    }
  );
   
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("inventory");
  },
};
