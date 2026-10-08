const { Product, Category, Supplier } = require("../models");
const { Op } = require("sequelize");
const createProductService = async (data) => {
  const existingProduct = await Product.findOne({ where: { sku: data.sku } });
  if (existingProduct) {
    throw new Error("Product already exists");
  }

  const existingCategory = await Category.findOne({
    where: { id: data.categoryId },
  });
  if (!existingCategory) {
    throw new Error("Category not found");
  }
  const existingSupplier = await Supplier.findOne({
    where: { id: data.supplierId },
  });
  if (!existingSupplier) {
    throw new Error("Supplier not found");
  }
  const product = await Product.create(data);
  return product;
};

const getAllProductsService = async ({ page, limit, search, status }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (search) {
    [Op.like] = `%${search.trim()}%`;
  }
  if (status) {
    where.status = status;
  }
  const { rows, count } = await Product.findAndCountAll({
    where,
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "description"],
      },
      {
        model: Supplier,
        as: "supplier",
        attributes: ["id", "name", "email", "phone"],
      },
    ],
    limit,
    offset,
  });

  const totalPages = Math.ceil(count / limit);
  return {
    products: rows,
    currentPage: page,
    totalPages,
    limit,
    total: count,
  };
};

const getByIdService = async (id) => {
  const product = await Product.findByPk(id, {
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "description"],
      },
      {
        model: Supplier,
        as: "supplier",
        attributes: ["id", "name", "email", "phone"],
      },
    ],
  });
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const updateProductService = async (id, data) => {
  const existingProduct = await Product.findByPk(id);
  if (!existingProduct) {
    throw new Error("Product not found");
  }

  if (data.sku) {
    const duplicateProduct = await Product.findOne({
      where: { sku: data.sku, id: { [Op.ne]: id } },
    });
    if (duplicateProduct) {
      throw new Error("Product already exists");
    }
  }
  if (data.categoryId) {
    const existingCategory = await Category.findOne({
      where: { id: data.categoryId },
    });
    if (!existingCategory) {
      throw new Error("Category not found");
    }
  }
  if (data.supplierId) {
    const existingSupplier = await Supplier.findOne({
      where: { id: data.supplierId },
    });
    if (!existingSupplier) {
      throw new Error("Supplier not found");
    }
  }
  await existingProduct.update(data);
  return existingProduct;
};

const deleteProductService=async(id)=>{
  const existingProduct=await Product.findByPk(id);
  if(!existingProduct){
    throw new Error("Product not found");
  }
  await existingProduct.destroy({where:{id}});
}

module.exports = {
  createProductService,
  getAllProductsService,
  getByIdService,
  updateProductService,
  deleteProductService
};
