const express = require("express");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");
const { createSupplierController, getAllSuppliersController, updateSupplierController, deleteSupplierController } = require("../controllers/suppliers.controller");

const router=express.Router();
router.post("/create", EmployeeAuthMiddleware, Authorize("CREATE_SUPPLIER"),createSupplierController);
router.get("/all", EmployeeAuthMiddleware, Authorize("READ_SUPPLIER"),getAllSuppliersController);
router.put("/:id", EmployeeAuthMiddleware, Authorize("UPDATE_SUPPLIER"),updateSupplierController);
router.delete("/:id", EmployeeAuthMiddleware, Authorize("DELETE_SUPPLIER"),deleteSupplierController);

module.exports=router