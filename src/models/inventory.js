const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    static associate(models) {
      Inventory.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      Inventory.belongsTo(models.Warehouse, {
        foreignKey: "warehouseId",
        as: "warehouse",
      });
    }
  }
  Inventory.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "products", key: "id" },
        onDelete: "RESTRICT",
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "warehouse", key: "id" },
        onDelete: "RESTRICT",
      },

      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "In Stock",
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      available: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      reserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      min: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },

    {
      sequelize,
      modelName: "Inventory",
      tableName: "inventory",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["productId", "warehouseId"],
        },
      ],
    },
  );
  return Inventory;
};
