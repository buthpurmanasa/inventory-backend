const {
  createSupplier,
  getAllSupliers,
  updateSupplierService,
  deleteSupplierService,
} = require("../services/suppliers.service");

const createSupplierController = async (req, res) => {
  try {
    const { name, email, phone, address, state, city, gst, status } = req.body;
    const response = await createSupplier(
      name,
      email,
      phone,
      address,
      state,
      city,
      gst,
      status,
    );
    return res
      .status(201)
      .json({ message: "Supplier created successfully", data: response });
  } catch (error) {
    if (error.message === "Supplier already exists")
      return res.status(400).json({ message: "Supplier already exists" });
    return res.status(500).json({ message: error.message });
  }
};

const getAllSuppliersController = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const response = await getAllSupliers({
      page: Number(page),
      limit: Number(limit),
      status,
      search,
    });
    return res
      .status(200)
      .json({ message: "Suppliers fetched successfully", data: response });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSupplierController = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (isNaN(id))
      return res.status(400).json({ message: "Id must be a number" });
    const { name, email, phone, address, state, city, gst, status } = req.body;

    const data = {
      name,
      email,
      phone,
      address,
      state,
      city,
      gst,
      status,
    };
    const response = await updateSupplierService(Number(id), data);
    return res
      .status(200)
      .json({ message: "Supplier updated successfully", data: response });
  } catch (error) {
    if (error.message === "Supplier not found")
      return res.status(404).json({ message: "Supplier not found" });
    return res.status(500).json({ message: error.message });
  }
};

const deleteSupplierController = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteSupplierService(Number(id));
    return res
      .status(200)
      .json({ message: "Supplier deleted successfully", data: response });
  } catch (error) {
    if (error.message === "Supplier not found")
      return res.status(404).json({ message: "Supplier not found" });
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createSupplierController,
  getAllSuppliersController,
  updateSupplierController,
  deleteSupplierController
};
