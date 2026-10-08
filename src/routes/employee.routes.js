const express  = require("express");
const { createEmployeeController, AllEmployees } = require("../controllers/employee.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize=require("../middleware/employeeAuthorize.middleware")

const router=express.Router()
router.post("/create", createEmployeeController);
router.get("/all", EmployeeAuthMiddleware, Authorize("READ_EMPLOYEE"), AllEmployees)
module.exports=router;