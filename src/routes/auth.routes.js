const express = require("express");

const { loginController, getAllEmployeController, refreshTokenController, logoutController } = require("../controllers/auth.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");

const router=express.Router();

router.post("/login",loginController);
router.get("/me", EmployeeAuthMiddleware, getAllEmployeController);
router.get("/refresh", refreshTokenController);
router.post("/logout",  logoutController);


module.exports=router