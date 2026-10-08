const { createStockInService } = require("../services/stockIn.service");

const CreateStockInController = async (req, res, next) => {
  try {
    const { supplierId, warehouseId, totalAmount, note, items } = req.body;
  
    const data = {
      supplierId,
      warehouseId,
      totalAmount,
      // note,
      items,
    };
    const response = await createStockInService(data);
    return res
      .status(201)
      .json({ message: "StockIn created successfully", data: response });
  } catch (error) {
    return next(error);
  }
};

module.exports={CreateStockInController}
