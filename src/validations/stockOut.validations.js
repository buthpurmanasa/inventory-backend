
const { z } = require("zod");

const stockOutSchema = z.object({
  warehouseId: z.number().int().positive(),

  productId: z.number().int().positive(),

  quantity: z.number().int().positive(),

  reason: z.string().min(1, "Reason is required"),

  note: z.string().optional(),
});

module.exports = { stockOutSchema };
