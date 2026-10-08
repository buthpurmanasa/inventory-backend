const { Warehouse } = require("../models");
const { Op } = require("sequelize");

const createWarehouseService = async (data) => {
  const exisitngWarehouse = await Warehouse.findOne({
    where: { code: data.code },
  });
  if (exisitngWarehouse) {
    throw new Error("Warehouse already exists");
  }
  const response = await Warehouse.create(data);
  return response;
};

const getAllWarehouseService = async ({page, limit, search, status}) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (search) {
    where.name = {
      [Op.like]: `%${search.trim()}%`,
    };
  }
  if (status) {
    where.status = status;
  }
  const { rows, count } = await Warehouse.findAndCountAll({
    where,
    limit,
    offset,
  });
  const totalPages = Math.ceil(count / limit);
  return {
    warehouses: rows,
    currentPage: page,
    totalPages,
    limit,
    total: count,
  };
};

const getByIdWarehouseService = async (id) => {
  const warehouse = await Warehouse.findByPk(id);
  return warehouse;
};

const updateWarehouseService = async (id,data) => {
  const existingwarehouse = await Warehouse.findByPk(id);
  if (!existingwarehouse) {
    throw new Error("warehouse not found");
  }
  if (data.code) {
    const duplicateCode = await Warehouse.findOne({
     
       where: { code: data.code, id: { [Op.ne]: id } },
    });
    if (duplicateCode) {
      throw new Error("warehouse already exists");
    }
  }
   await existingwarehouse.update(data, { where: { id } });
  return existingwarehouse;
};
module.exports = {
  createWarehouseService,
  getAllWarehouseService,
  getByIdWarehouseService,
  updateWarehouseService
};
