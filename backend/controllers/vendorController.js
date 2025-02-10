const Dispute = require("../models/Dispute");
const Transaction = require("../models/Transaction");
const asyncHandler = require("express-async-handler");
const axios = require("axios");
const nodemailer = require("nodemailer");

// ✅ Get disputes related to transactions handled by the vendor
const getVendorDisputes = asyncHandler(async (req, res) => {
  const vendorId = req.user._id; // ✅ Ensure vendor is authenticated

  // ✅ Fetch transactions linked to this vendor
  const vendorTransactions = await Transaction.find({ vendorId }).select("_id");

  // ✅ Extract transaction IDs
  const transactionIds = vendorTransactions.map(tx => tx._id);

  // ✅ Fetch disputes where transactionId matches vendor's transactions
  const disputes = await Dispute.find({ transactionId: { $in: transactionIds } }).populate("transactionId", "amount status");

  res.json(disputes);
});

// ✅ Vendor: Check Fraud Status via Mock Card Network API
const checkFraudStatus = asyncHandler(async (req, res) => {
  const { transactionId } = req.params;

  try {
    // 🔗 Call MockCardNetwork API to check fraud status
    const response = await axios.get(`https://mockcardnetwork.com/api/fraud-check/${transactionId}`);

    // ✅ Update fraud status if detected
    if (response.data.isFraudulent) {
      await Dispute.findOneAndUpdate(
        { transactionId },
        { status: "Fraud Detected" },
        { new: true }
      );
    }

    res.json({
      transactionId,
      fraudStatus: response.data.isFraudulent ? "Fraud Detected" : "Safe",
      riskScore: response.data.riskScore
    });
  } catch (error) {
    res.status(500).json({ message: "Error contacting fraud detection API", error: error.message });
  }
});

// ✅ Vendor: Fetch Transactions Verified by MockCardNetwork
const getVerifiedTransactions = asyncHandler(async (req, res) => {
  const vendorId = req.user._id;

  try {
    // 🔗 Call MockCardNetwork API for verified transactions
    const response = await axios.get(`https://mockcardnetwork.com/api/transactions?vendorId=${vendorId}`);

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving transactions", error: error.message });
  }
});

// ✅ Notify Vendor about New Disputes (Only Admins Allowed)
const notifyVendor = asyncHandler(async (req, res) => {
  const { vendorEmail, disputeId } = req.body;

  // Fetch dispute details
  const dispute = await Dispute.findById(disputeId);
  if (!dispute) {
    return res.status(404).json({ message: "Dispute not found" });
  }

  // ✅ Ensure only admins can send notifications (Better Handled in Middleware)
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  // Configure email transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Email message
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: vendorEmail,
    subject: "New Dispute Notification",
    text: `A new dispute has been raised for a transaction related to your services. \n\n Dispute ID: ${disputeId} \n Reason: ${dispute.reason}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Vendor notified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
});

module.exports = { getVendorDisputes, checkFraudStatus, getVerifiedTransactions, notifyVendor };
