const express = require("express");
const { createRoleController } = require("../controllers/role.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");



const router=express.Router();

router.post("/create",  EmployeeAuthMiddleware,
  Authorize("employee_create"),createRoleController);


module.exports=router