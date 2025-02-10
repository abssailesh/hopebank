const express = require("express");
const { protect, admin, vendor } = require("../middlewares/authMiddleware");
const { getAllDisputes, getVendorDisputes } = require("../controllers/disputeController");

const router = express.Router();

// ✅ Admins can view all disputes
router.get("/admin", protect, admin, getAllDisputes);

// ✅ Vendors can view disputes related to their transactions
router.get("/vendor", protect, vendor, getVendorDisputes);

module.exports = router;
