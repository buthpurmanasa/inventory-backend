const { Supplier, Product } = require("../models");
const { Op } = require("sequelize");

const createSupplier = async (
  name,
  email,
  phone,
  gst,
  address,
  city,
  state,
  country,
) => {
  const existingSupplier = await Supplier.findOne({ where: { email } });
  if (existingSupplier) {
    throw new Error("Supplier already exists");
  }
  const supplier = await Supplier.create({
    name,
    email,
    phone,
    gst,
    address,
    city,
    state,
    country,
  });
  return supplier;
};

const getAllSupliers = async ({ page, limit, search , status}) => {
  const offset = (page - 1) * limit;
  const where = {};
  if (search) {
    where.name = {
      [Op.like]: `%${search.trim()}%`,
    };
  }

  if(status){
    where.status=status
  }
  const { rows, count } = await Supplier.findAndCountAll({
    where,
    // include:{
    //   model:Product,
    //   as:"products",

    // },
    limit,
    offset,
  });
  const totalPages = Math.ceil(count / limit);
  return {
    suppliers: rows,
    currentPage: page,
    totalPages,
    limit,
    total: count,
  };
};

const updateSupplierService=async(id, data)=>{
  const existingSupplier=await Supplier.findByPk(id);
  if(!existingSupplier){
    throw new Error("Supplier not found");
  }
  await existingSupplier.update(data);
}

const deleteSupplierService=async(id)=>{
  const existingSupplier=await Supplier.findByPk(id);
  if(!existingSupplier){
    throw new Error("Supplier not found");
  }
  await existingSupplier.destroy({where:{id}});
}

module.exports = { createSupplier, getAllSupliers,updateSupplierService , deleteSupplierService};
