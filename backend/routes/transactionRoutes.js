const express = require("express");
const { createTransaction, getUserTransactions } = require("../controllers/transactionController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", protect, createTransaction);
router.get("/", protect, getUserTransactions);

module.exports = router;
