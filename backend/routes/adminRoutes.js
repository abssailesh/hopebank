const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware"); // ✅ Import admin middleware
const { approveDispute, rejectDispute, checkFraudStatus } = require("../controllers/adminController");

const router = express.Router();

// ✅ Only admins can approve or reject disputes
router.put("/approve-dispute/:id", protect, admin, approveDispute);
router.put("/reject-dispute/:id", protect, admin, rejectDispute);

// ✅ Only admins should check fraud status (Restricted to Admin)
router.get("/fraud-check/:transactionId", protect, admin, checkFraudStatus);

module.exports = router;
