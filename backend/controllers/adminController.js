const Dispute = require("../models/Dispute");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

// ✅ Approve a dispute (Admin)
const approveDispute = asyncHandler(async (req, res) => {
  const dispute = await Dispute.findById(req.params.id);
  if (!dispute) {
    return res.status(404).json({ message: "Dispute not found" });
  }

  dispute.status = "Resolved";
  await dispute.save();

  res.json({ message: "Dispute approved successfully!" });
});

// ✅ Reject a dispute (Admin)
const rejectDispute = asyncHandler(async (req, res) => {
  const dispute = await Dispute.findById(req.params.id);
  if (!dispute) {
    return res.status(404).json({ message: "Dispute not found" });
  }

  dispute.status = "Rejected";
  await dispute.save();

  res.json({ message: "Dispute rejected successfully!" });
});

// ✅ Fetch Fraud Status from Mock Card Network API
const checkFraudStatus = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  try {
    // 🔗 Mock API Call (Use actual mock service)
    const response = await axios.get(`https://mockcardnetwork.com/api/fraud-check/${transactionId}`);

    if (response.data.isFraudulent) {
      // ✅ Update only the relevant dispute
      const updatedDispute = await Dispute.findOneAndUpdate(
        { transactionId },
        { status: "Fraud Detected" },
        { new: true }
      );

      if (!updatedDispute) {
        return res.status(404).json({ message: "No dispute found for this transaction" });
      }

      return res.json({ message: "Fraud detected, dispute updated", fraudDetails: response.data });
    }

    res.json({ message: "No fraud detected", fraudDetails: response.data });
  } catch (error) {
    console.error("Error contacting fraud API:", error.message);
    res.status(500).json({ message: "Error fetching fraud status", error: error.message });
  }
});

module.exports = { approveDispute, rejectDispute, checkFraudStatus };
