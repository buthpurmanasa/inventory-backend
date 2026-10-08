const {
  Warehouse,
  Product,
  Inventory,
  StockOut,
  sequelize,
} = require("../models");

const createStockOutService = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const existingWarehouse = await Warehouse.findByPk(data.warehouseId, {
      transaction,
    });
    if (!existingWarehouse) {
      throw new Error("Warehouse not found");
    }
    const existingProduct = await Product.findByPk(data.productId, {
      transaction,
    });
    if (!existingProduct) {
      throw new Error("Product not found");
    }
    const existingInventory = await Inventory.findOne({
      where: {
        productId: data.productId,
        warehouseId: data.warehouseId,
      },
      transaction,
    });
    console.log("INVENTORY:", existingInventory?.toJSON());
console.log("REQUESTED QUANTITY:", data.quantity);
console.log("AVAILABLE:", existingInventory?.available);
    if (!existingInventory) {
      throw new Error("Inventory not found");
    }
    const availableCount = existingInventory.available;
    if (data.quantity > availableCount) {
      throw new Error("Insufficient stock available");
    }
    console.log("CREATING STOCKOUT");

    const stockOut = await StockOut.create({...data, availableCount }, { transaction });
    console.log("STOCKOUT CREATED:", stockOut.toJSON());
    await existingInventory.update(
      {
        stock: existingInventory.stock - data.quantity,
        available: existingInventory.available - data.quantity,
      },
      { transaction },
    );
    await transaction.commit();
    return stockOut;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
module.exports = {
  createStockOutService,
};
