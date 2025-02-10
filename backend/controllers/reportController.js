const fs = require("fs");
const path = require("path");
const Dispute = require("../models/Dispute");
const Transaction = require("../models/Transaction");
const { generatePDFReport, generateCSVReport } = require("../utils/generateReport");
const asyncHandler = require("express-async-handler");

// Ensure reports directory exists
const reportsDir = path.join(__dirname, "../reports");
if (!fs.existsSync(reportsDir)) fs.mkdirSync(reportsDir, { recursive: true });

// 📌 List available reports
const getAvailableReports = asyncHandler(async (req, res) => {
  res.json({
    message: "Available reports",
    reports: [
      { name: "Admin Dispute Report", endpoint: "/api/reports/admin/disputes" },
      { name: "Vendor Transaction Report", endpoint: "/api/reports/vendor/transactions" }
    ]
  });
});

// 📌 Generate Dispute Report (Admin)
const generateDisputeReport = asyncHandler(async (req, res) => {
  const disputes = await Dispute.find();
  if (!disputes.length) return res.status(404).json({ message: "No disputes found" });

  const filename = `dispute-report-${Date.now()}.pdf`;
  const filePath = path.join(reportsDir, filename);
  
  await generatePDFReport(disputes, filePath, "Dispute Report");

  res.download(filePath, filename, (err) => {
    if (err) console.error("Error during file download:", err);
    fs.unlinkSync(filePath); // Delete file after sending response
  });
});

// 📌 Generate Transaction Report (Vendor)
const generateTransactionReport = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ vendorId: req.user._id });
  if (!transactions.length) return res.status(404).json({ message: "No transactions found" });

  const filename = `transaction-report-${Date.now()}.csv`;
  const filePath = path.join(reportsDir, filename);

  const headers = [
    { id: "amount", title: "Amount" },
    { id: "currency", title: "Currency" },
    { id: "status", title: "Status" }
  ];

  await generateCSVReport(transactions, filePath, headers);

  res.download(filePath, filename, (err) => {
    if (err) console.error("Error during file download:", err);
    fs.unlinkSync(filePath);
  });
});

module.exports = { getAvailableReports, generateDisputeReport, generateTransactionReport };
