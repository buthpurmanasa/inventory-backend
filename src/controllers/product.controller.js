const {
  createProductService,
  getAllProductsService,
  getByIdService,
  updateProductService,
  deleteProductService,
} = require("../services/product.service");

const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      sku,
      categoryId,
      supplierId,
      sellingPrice,
      purchasePrice,
    } = req.body;
    const data = {
      name,
      description,
      sku,
      categoryId,
      supplierId,
      sellingPrice,
      purchasePrice,
    };
    const response = await createProductService(data);
    return res
      .status(201)
      .json({ message: "Product created successfully", data: response });
  } catch (error) {
    if (error.message === "Product already exists") {
      return res.status(400).json({ message: "Product already exists" });
    }
    if (error.message === "Category not found") {
      return res.status(404).json({ message: "Category not found" });
    }
    if (error.message === "Supplier not found") {
      return res.status(404).json({ message: "Supplier not found" });
    }
    return res.status(500).json({ message: error.message });
  }
};

const allProductsController = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const response = await getAllProductsService({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
    });
    return res
      .status(200)
      .json({ message: "Products fetched successfully", data: response });
  } catch (error) {
    next(error)
  }
};

const getByIdProductController=async (req, res,next)=>{
  try {
    const {id}=req.params;
    if(!id || isNaN(id)){
      return res.status(400).json({message:"Id must be a number"});
    }
    const response=await getByIdService(Number(id));
    return res.status(200).json({message:"Product found", data:response});
    
  } catch (error) {
   next(error)
  }
}

const updateProductController=async(req, res, next)=>{
  try {
    const {id}=req.params;
    const {name, description, sku, categoryId, supplierId, sellingPrice, purchasePrice}=req.body;
    if(!id || isNaN(id)){
      return res.status(400).json({message:"Id must be a number"});
    }
    const data={
      name,
      description,
      sku,
      categoryId,
      supplierId,
      sellingPrice,
      purchasePrice
    }
    const response=await updateProductService(Number(id), data);
    return res.status(200).json({message:"Product updated successfully", data:response});
  } catch (error) {
    next(error)
  }
}

const deleteProductController=async(req,res,next)=>{
  try {
    const {id}=req.params;
    const response=await deleteProductService(Number(id));
    return res.status(200).json({message:"Product deleted successfully", data:response});
  } catch (error) {
    next(error)
  }
}

module.exports = { createProductController ,allProductsController,getByIdProductController,updateProductController,deleteProductController};
