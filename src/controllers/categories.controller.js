const {
  createCategoriesService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/categories.service");
const createCategoriesController = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categories = await createCategoriesService(name, description);
    return res.status(201).json({
      message: "Categories created successfully",
      data: categories,
    });
  } catch (error) {
    if (error.message === "Category already exists") {
      return res.status(400).json({
        message: "Category already exists",
      });
    }
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const AllCategoriesController = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const response = await getAllCategoriesService({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    return res
      .status(200)
      .json({ message: " Categories fetched successfully", data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateCategoriesController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Id must be a number" });
    }
    if (!name) {
      return res.status(400).json({ message: "Category Name is required" });
    }
    const response = await updateCategoryService(Number(id), name, description);
    return res
      .status(200)
      .json({ message: " Categories updated successfully", data: response });
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: "Category not found" });
    }
    if (error.message === "Category already exists") {
      return res.status(400).json({ message: "Category already exists" });
    }
    return res.status(500).json({ message: error.message });
  }
};

const deleteCategoriesController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteCategoryService(Number(id));
    return res
      .status(200)
      .json({ message: " Categories deleted successfully", data: response });
  } catch (error) {
    if (error.message === "Category not found") {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCategoriesController,
  AllCategoriesController,
  updateCategoriesController,
  deleteCategoriesController
};
