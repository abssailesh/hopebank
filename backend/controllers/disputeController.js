const Dispute = require("../models/Dispute");
const asyncHandler = require("express-async-handler");

// ✅ Admin: Get all disputes raised by users
const getAllDisputes = asyncHandler(async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  const disputes = await Dispute.find().populate("userId", "username email").populate("transactionId");
  res.json(disputes);
});

// ✅ Vendor: Get disputes related to vendor transactions
const getVendorDisputes = asyncHandler(async (req, res) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Access denied, vendor only" });
  }

  const disputes = await Dispute.find()
    .populate({
      path: "transactionId",
      match: { vendorId: req.user._id }, // ✅ Only fetch disputes related to this vendor
    })
    .populate("userId", "username email");

  // Filter out null transactions (disputes unrelated to this vendor)
  const filteredDisputes = disputes.filter((dispute) => dispute.transactionId !== null);

  res.json(filteredDisputes);
});

module.exports = { getAllDisputes, getVendorDisputes };
