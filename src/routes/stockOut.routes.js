
const { stockOutController } = require("../controllers/sockOut.controller");
const {
  CreateStockInController,
} = require("../controllers/stockIn.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");
const express = require("express");

const router = express.Router();
router.post(
  "/stockOut",
//   EmployeeAuthMiddleware,
//   Authorize("CREATE_STOCK"),

  stockOutController,
);

module.exports = router;
