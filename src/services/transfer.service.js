const {
  Transfer,
  sequelize,
  Warehouse,
  Inventory,
  Product,
} = require("../models");

const transferService = async (data) => {
  const t = await sequelize.transaction();
  try {
    const existingWarehouseFrom = await Warehouse.findByPk(
      data.fromWarehouseId,
      { transaction: t },
    );
    if (!existingWarehouseFrom) {
      throw new Error("Warehouse From not found");
    }
    const existingWarehouseTo = await Warehouse.findByPk(data.toWarehouseId, {
      transaction: t,
    });
    if (!existingWarehouseTo) {
      throw new Error("Warehouse To not found");
    }
    const existingProduct = await Product.findByPk(data.productId, {
      transaction: t,
    });
    if (!existingProduct) {
      throw new Error("Product not found");
    }
console.log("FROM WAREHOUSE:", data.fromWarehouseId);
console.log("PRODUCT:", data.productId);
console.log("TO WAREHOUSE:", data.toWarehouseId);
const allInventory = await Inventory.findAll({
  where: {
    productId: data.productId,
  },
  transaction: t,
});

console.log("ALL INVENTORY:", allInventory.map(item => item.toJSON()));
    const existingInventory = await Inventory.findOne({
      where: {
        productId: data.productId,
        warehouseId: data.fromWarehouseId,
      },
      transaction: t,
    });
    console.log("ALL INVENTORY:", allInventory.map(item => item.toJSON()));
    if (!existingInventory) {
      throw new Error("Inventory not found");
    }
    const availableCount = existingInventory.available;
    if (data.quantity > availableCount) {
      throw new Error("Insufficient Quantity");
    }
    const response = await Transfer.create(data, { transaction: t });
    await Inventory.update(
      {
        stock: existingInventory.stock - data.quantity,
        available: existingInventory.available - data.quantity,
      },
      {
        where: { productId: data.productId, warehouseId: data.fromWarehouseId },
        transaction: t,
      },
    );
    const existingInventoryTo = await Inventory.findOne({
      where: {
        productId: data.productId,
        warehouseId: data.toWarehouseId,
      },
      transaction: t,
    });
    if (existingInventoryTo) {
      await Inventory.update(
        {
          availabe: existingInventoryTo.available + data.quantity,
        },
        {
          where: { productId: data.productId, warehouseId: data.toWarehouseId },
          transaction: t,
        },
      );
    } else {
      await Inventory.create(
        {
          productId: data.productId,
          warehouseId: data.toWarehouseId,
          stock: data.quantity,
          available: data.quantity,
        },
        { transaction: t },
      );
    }
    await t.commit();
    return response;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

module.exports = {
  transferService,
};
