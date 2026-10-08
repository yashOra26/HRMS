const express = require("express");
const {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updatedDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  roleMiddleware("admin"),
  createDepartment,
);
router.get(
  "/get",
  authMiddleware,
  roleMiddleware("admin", "employee"),
  getAllDepartment,
);
router.get(
  "/get/:id",
  authMiddleware,
  roleMiddleware("admin", "employee"),
  getDepartmentById,
);
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updatedDepartment,
);
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteDepartment,
);

module.exports = router;
