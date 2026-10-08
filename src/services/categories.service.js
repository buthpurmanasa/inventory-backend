const { Category } = require("../models");
const { Op } = require("sequelize");

const createCategoriesService = async (name, description) => {
  const existingCategory = await Category.findOne({ where: { name } });
  if (existingCategory) {
    throw new Error("Category already exists");
  }
  const category = await Category.create({ name, description });
  return category;
};

const getAllCategoriesService = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (search) {
    where.name = {
      [Op.like]: `%${search.trim()}%`,
    };
  }
  const { rows, count } = await Category.findAndCountAll({
    where,
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });

  const totalPages = Math.ceil(count / limit);
  return {
    categories: rows,
    currentPage: page,
    totalPages,
    limit,
    total: count,
  };
};

const updateCategoryService = async (id, name, description) => {
  const existingCategory = await Category.findByPk(id);
  if (!existingCategory) {
    throw new Error("Category not found");
  }

  const duplicateCategory = await Category.findOne({
    where: { name, id: { [Op.ne]: id } },
  });
  if (duplicateCategory) {
    throw new Error("Category already exists");
  }

  await Category.update(
    {
      name,
      description,
    },
    {
      where: { id },
    },
  );

  const updatedCategory = await Category.findByPk(id);

  return updatedCategory;
};

const deleteCategoryService = async (id) => {
  const existingCategory = await Category.findByPk(id);
  if (!existingCategory) {
    throw new Error("Category not found");
  }
  await Category.destroy({ where: { id } });
};

module.exports = {
  createCategoriesService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService
};
