const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockIn extends Model {
    static associate(models) {
      StockIn.belongsTo(models.Supplier, {
        foreignKey: "supplierId",
        as: "supplier",
      });
      StockIn.belongsTo(models.Warehouse, {
        foreignKey: "warehouseId",
        as: "warehouse",
      });

      StockIn.hasMany(models.StockinItems, {
        foreignKey: "stockInId",
        as: "items",
      });
    }
  }
  StockIn.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "suppliers",
          key: "id",
        },
        onDelete: "RESTRICT",
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
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      note: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "stock_in",
      modelName: "StockIn",
      timestamps: true,
    },
  );
  return StockIn;
};
