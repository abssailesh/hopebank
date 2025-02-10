const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["vendor"], default: "vendor" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
