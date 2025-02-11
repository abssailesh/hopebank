const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: { type: String, enum: ["Success", "Failed", "Pending"], default: "Success" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
