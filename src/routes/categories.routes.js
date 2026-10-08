const {
  createCategoriesController,
  AllCategoriesController,
  updateCategoriesController,
  deleteCategoriesController,
} = require("../controllers/categories.controller");
const EmployeeAuthMiddleware = require("../middleware/auth.middleware");
const Authorize = require("../middleware/employeeAuthorize.middleware");
const express = require("express");


const router = express.Router();
router.post(
  "/create",
  EmployeeAuthMiddleware,
  Authorize("CREATE_CATEGORY"),
  createCategoriesController,
);

router.get("/all", EmployeeAuthMiddleware, Authorize("READ_CATEGORY"),AllCategoriesController );
router.put("/:id", EmployeeAuthMiddleware, Authorize("UPDATE_CATEGORY"), updateCategoriesController);
router.delete("/:id", EmployeeAuthMiddleware, Authorize("DELETE_CATEGORY"), deleteCategoriesController);

module.exports = router;