const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      Warehouse.hasMany(models.StockIn, {
        foreignKey: "warehouseId",
        as: "stockIns",
      });

      Warehouse.hasMany(models.Inventory, {
        foreignKey: "warehouseId",
        as: "inventories",
      });
      Warehouse.hasMany(models.StockOut, {
        foreignKey: "warehouseId",
        as: "stockOuts",
      });
      Warehouse.hasMany(models.Transfer,{
        foreignKey: "fromWarehouseId",
        as: "transfersFrom",
      });
      Warehouse.hasMany(models.Transfer,{
        foreignKey: "toWarehouseId",
        as: "transfersTo",
      })
    }
  }

  Warehouse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manager: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Warehouse",
      tableName: "warehouse",
      timestamps: true,
    },
  );
  return Warehouse;
};
