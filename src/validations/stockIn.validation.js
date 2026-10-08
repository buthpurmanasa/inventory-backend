const { z } = require("zod");

const stockInSchema = z.object({
  supplierId: z.number().int().positive(),

  warehouseId: z.number().int().positive(),

  totalAmount: z.number().positive(),

  note: z.string().optional(),

  items: z
    .array(
      z.object({
        productId: z.number().int().positive(),

        quantity: z.number().int().positive(),

        price: z.number().positive(),
      }),
    )
    .min(1, "At least one product is required"),
});

module.exports = {
  stockInSchema,
};