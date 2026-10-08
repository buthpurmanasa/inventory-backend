
const { transferController } = require("../controllers/transfer.controller");
const {
  CreateStockInController,
} = require("../controllers/stockIn.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");
const express = require("express");

const router = express.Router();
router.post(
  "/transfer",
//   EmployeeAuthMiddleware,
//   Authorize("CREATE_STOCK"),

  transferController,
);

module.exports = router;
