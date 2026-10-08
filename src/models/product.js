const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      Product.belongsTo(models.Supplier, {
        foreignKey: "supplierID",
        as: "supplier",
      });
      Product.hasMany(models.StockinItems, {
        foreignKey: "productId",
        as: "stockinItems",
      });
      Product.hasMany(models.Inventory, {
        foreignKey: "productId",
        as: "inventories",
      });
      Product.hasMany(models.StockOut, {
        foreignKey: "productId",
        as: "stockOuts",
      });
      Product.hasMany(models.Transfer, {
        foreignKey: "productId",
        as: "transfers",
      });
    }
  }
  Product.init(
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
      sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      purchasePrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      sellingPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      supplierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
    },
  );
  return Product;
};
