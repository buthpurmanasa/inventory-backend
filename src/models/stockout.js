const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockOut extends Model {
    static associate(models) {
      StockOut.belongsTo(models.Warehouse, {
        foreignKey: "warehouseId",
        as: "warehouse",
      });
      StockOut.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  StockOut.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      warehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouse",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      availableCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StockOut",
      tableName: "stockout",
      timestamps: true,
    },
  );
  return StockOut;
};
