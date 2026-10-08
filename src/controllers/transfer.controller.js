const { transferService } = require("../services/transfer.service");

const transferController = async (req, res) => {
  
  try {
    const {
      fromWarehouseId,
      toWarehouseId,
      productId,
      quantity,
      note,
      reason,
    } = req.body;
    if (
    isNaN(fromWarehouseId) ||
    isNaN(toWarehouseId) ||
    isNaN(productId) ||
    isNaN(quantity)
  ) {
    return res
      .status(400)
      .json({ message: "Ids and quantity must be numbers" });
  }
    const data = {
      fromWarehouseId,
      toWarehouseId,
      productId,
      quantity,
      note,
      reason,
    };
    const response = await transferService(data);
    return res
      .status(201)
      .json({ message: "Transfer created successfully", data: response });
  } catch (error) {
    if (error.message === "Inventory not found") {
      return res.status(404).json({ message: "Inventory not found" });
    }
    if (error.message === "Insufficient Quantity") {
      return res.status(400).json({ message: "Insufficient Quantity" });
    }
    if (error.message === "Warehouse not found") {
      return res.status(404).json({ message: "Warehouse not found" });
    }
    if (error.message === "Product not found") {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { transferController };
