const express = require("express");
const router = express.Router();

// Mock Fraud Check API
router.get("/fraud-check/:transactionId", (req, res) => {
  const { transactionId } = req.params;

  // Simulating fraud detection logic
  const fraudDetected = Math.random() < 0.3; // 30% chance of fraud
  const riskScore = fraudDetected ? Math.floor(Math.random() * 100) + 1 : 0;
  const recommendation = fraudDetected ? "Block Transaction" : "Allow Transaction";

  res.json({
    transactionId,
    isFraudulent: fraudDetected,
    riskScore,
    recommendation,
  });
});

module.exports = router;
