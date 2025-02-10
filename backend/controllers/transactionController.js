const Transaction = require("../models/Transaction");
const asyncHandler = require("express-async-handler");

// Create a new transaction
const createTransaction = asyncHandler(async (req, res) => {
  const { amount, currency } = req.body;

  if (!amount || !currency) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const transaction = await Transaction.create({
    userId: req.user._id,
    amount,
    currency,
  });

  res.status(201).json(transaction);
});

// Get transactions for a user
const getUserTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
});

module.exports = { createTransaction, getUserTransactions };
