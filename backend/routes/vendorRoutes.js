const express = require("express");
const { protect, vendor } = require("../middlewares/authMiddleware");
const { getVendorDisputes, checkFraudStatus, getVerifiedTransactions, notifyVendor } = require("../controllers/vendorController");

const router = express.Router();

// ✅ Vendor retrieves disputes related to their transactions
router.get("/disputes", protect, vendor, getVendorDisputes);

// ✅ Vendor fraud verification via MockCardNetwork
router.get("/fraud-check/:transactionId", protect, vendor, checkFraudStatus);

// ✅ Vendor retrieves transactions verified by MockCardNetwork
router.get("/transactions", protect, vendor, getVerifiedTransactions);

// ✅ Notify vendor about a new dispute (Only Admin)
router.post("/notify", protect, vendor, notifyVendor);

module.exports = router;
