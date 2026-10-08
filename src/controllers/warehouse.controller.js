const { createWarehouseService, getAllWarehouseService, updateWarehouseService, getByIdWarehouseService } = require("../services/warehouse.service");

const createWarehouseController = async (req, res, next) => {
  try {
    const { name, code, phone, manager, address, state, city,status } = req.body;
    const data = { name, code, phone, manager, address, state, city ,status};
    const warehouse = await createWarehouseService(data);
    return res.status(201).json({
      message: "warehouse created successfully",
      data: warehouse,
    });
  } catch (error) {
    next(error);
  }
};

const getAllWarehouseController = async (req, res, next) => {
    try {
        const {page=1, limit=10, search,status}=req.query;
        const response=await getAllWarehouseService({page:Number(page),limit:Number(limit),search,status});
        return res.status(200).json({message:"warehouse fetched successfully", data:response});
    } catch (error) {
        next(error)
    }
}

const getByIdWarehouseController=async(req, res, next)=>{
    try {
        const {id}=req.params;
        if(!id || isNaN(id)){
            return res.status(400).json({message:"Id must be a number"});
        }
        const response=await getByIdWarehouseService(Number(id));
        return res.status(200).json({message:"warehouse found", data:response});
    } catch (error) {
        next(error)
    }
}

const updateWarehouseController=async(req, res, next)=>{
  try {
    const {id}=req.params;
    if(!id || isNaN(id)){
      return res.status(400).json({message:"Id must be a number"});
    }
    const {name, code, phone, manager, address, state, city,status}=req.body;
    const data={name, code, phone, manager, address, state, city ,status};
    const response=await updateWarehouseService(Number(id), data);
    return res.status(200).json({message:"warehouse updated successfully", data:response});
  } catch (error) {
    next(error)
  }
}

module.exports = { createWarehouseController, getAllWarehouseController, getByIdWarehouseController, updateWarehouseController };
