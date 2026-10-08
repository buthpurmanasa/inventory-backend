const express = require("express");
const { createProductController, allProductsController, getByIdProductController, updateProductController, deleteProductController } = require("../controllers/product.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");

const router=express.Router()
router.post("/create", EmployeeAuthMiddleware, Authorize("CREATE_PRODUCT"), createProductController);
router.get("/all",EmployeeAuthMiddleware, Authorize("READ_WAREHOUSE"), allProductsController);
router.get("/:id" ,EmployeeAuthMiddleware, Authorize("READ_WAREHOUSE"), getByIdProductController)
router.put("/:id", EmployeeAuthMiddleware, Authorize("UPDATE_WAREHOUSE"), updateProductController);
router.delete("/:id", EmployeeAuthMiddleware, Authorize("DELETE_WAREHOUSE"),deleteProductController)

module.exports=router;