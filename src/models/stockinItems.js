const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockinItems extends Model {
    static associate(models) {
      StockinItems.belongsTo(models.StockIn, {
        foreignKey: "stockInId",
        through: "stockin_items",
        as: "stockIn",
      });
      StockinItems.belongsTo(models.Product, {
        foreignKey: "productId",
        through: "stockin_items",
        as: "product",
      });
    }
  }

  StockinItems.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      stockInId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "stock_in",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "StockinItems",
      tableName: "stockin_items",
      timestamps: true,
    },
  );
  return StockinItems;
};
