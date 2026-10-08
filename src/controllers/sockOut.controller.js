const { createStockOutService } = require("../services/stockOut.service");

const stockOutController = async (req, res, next) => {
  try {
    const { warehouseId, productId, quantity, reason, note } = req.body;
    const data = { warehouseId, productId, quantity, reason, note };
    const response = await createStockOutService(data);
    return res
      .status(201)
      .json({ message: "StockOut created successfully", data: response });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  stockOutController,
};
