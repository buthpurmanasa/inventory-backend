
const {
  CreateStockInController,
} = require("../controllers/stockIn.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");
const express = require("express");

const router = express.Router();
router.post(
  "/create",
//   EmployeeAuthMiddleware,
//   Authorize("CREATE_STOCK"),
  CreateStockInController,
);

module.exports = router;
