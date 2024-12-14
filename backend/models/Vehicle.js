const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema(
  {
    vehicleName: { type: String, required: true }, 
    status: {
      type: String,
      enum: ["received", "maintaining", "delivered", "trashed"],
      default: "received",
    },
    updatedAt: { type: Date, default: Date.now }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", VehicleSchema);
