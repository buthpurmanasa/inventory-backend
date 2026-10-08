const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    static associate(models) {
      Transfer.belongsTo(models.Warehouse, {
        foreignKey: "fromWarehouseId",
        as: "fromWarehouse",
      });
      Transfer.belongsTo(models.Warehouse, {
        foreignKey: "toWarehouseId",
        as: "toWarehouse",
      });
      Transfer.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }

  Transfer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      fromWarehouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "warehouse",
          key: "id",
        },
        onDelete: "RESTRICT",
      },
      toWarehouseId: {
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
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Transfer",
      tableName: "transfer",
      timestamps: true,
    },
  );
  return Transfer;
};
