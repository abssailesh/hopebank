const express = require("express");
const {
  generateDisputeReport,
  generateTransactionReport,
  getAvailableReports
} = require("../controllers/reportController"); // Ensure correct path

const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Default route to list available reports
router.get("/", protect, getAvailableReports);

// Admin Reports
router.get("/admin/disputes", protect, generateDisputeReport);

// Vendor Reports
router.get("/vendor/transactions", protect, generateTransactionReport);

module.exports = router;
