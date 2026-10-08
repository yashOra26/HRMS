const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Admin access granted",
      user: req.user,
    });
  }
);

router.get(
  "/employee",
  authMiddleware,
  roleMiddleware("employee"),
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Employee access granted",
      user: req.user,
    });
  }
);

module.exports = router;