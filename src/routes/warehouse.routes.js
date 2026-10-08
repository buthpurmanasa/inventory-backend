const express=require('express');
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");
const { createWarehouseController, getAllWarehouseController, getByIdWarehouseController, updateWarehouseController } = require('../controllers/warehouse.controller');

const router=express.Router();
router.post("/create", EmployeeAuthMiddleware, Authorize("CREATE_WAREHOUSE"),createWarehouseController);
router.get("/all", EmployeeAuthMiddleware, Authorize("READ_WAREHOUSE"),getAllWarehouseController);
router.get("/:id", EmployeeAuthMiddleware, Authorize("READ_WAREHOUSE"),getByIdWarehouseController);
router.put("/:id", EmployeeAuthMiddleware, Authorize("UPDATE_WAREHOUSE"),updateWarehouseController);
module.exports=router;