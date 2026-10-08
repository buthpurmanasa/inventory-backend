const { StockIn, StockinItems, Inventory, Product, Supplier, Warehouse, sequelize } = require("../models");



const createStockInService = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const existingSupplier = await Supplier.findByPk(data.supplierId);
    if (!existingSupplier) {
      throw new Error("Supplier not found");
    }

    const existingWarehouse = await Warehouse.findByPk(data.warehouseId);
    if (!existingWarehouse) {
      throw new Error("Warehouse not found");
    }
    const existingProducts = await Product.findAll({
      where: {
        id: data.items.map((item) => item.productId),
      },
    });
    if (existingProducts.length !== data.items.length) {
      throw new Error("One or more products not found");
    }
    const stockIn = await StockIn.create(
      {
        supplierId: data.supplierId,
        warehouseId: data.warehouseId,
        totalAmount: data.totalAmount,
        // note: data.note,
      },
      { transaction },
    );
    console.log("AFTER STOCKIN CREATE", stockIn.toJSON());
    const items = data.items.map((item) => {
      return {
        stockInId: stockIn.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
    });
    await StockinItems.bulkCreate(items, { transaction });
    for (const item of data.items) {
      const existingInventory = await Inventory.findOne({
        where: {
          productId: item.productId,
          warehouseId: data.warehouseId,
        },
        transaction,
      });

      if (existingInventory) {
        await existingInventory.update(
          {
            stock: existingInventory.stock + item.quantity,
            available: existingInventory.available + item.quantity,
          },
          { transaction },
        );
      } else {
        await Inventory.create(
          {
            productId: item.productId,
            warehouseId: data.warehouseId,
            stock: item.quantity,
            available: item.quantity,
          },
          { transaction },
        );
      }
    }

    await transaction.commit();
    return stockIn;
  } catch (error) {
      console.log("STOCK IN ERROR:", error);
    await transaction.rollback();
    throw error;
  }
};
module.exports = {
  createStockInService,
};
