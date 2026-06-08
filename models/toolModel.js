const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    brand: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    pricePerDay: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 5.0
    },
    image: {
      type: String,
      default: "/tool3.png"
    },
    status: {
      type: String,
      enum: ["Available", "Rented", "Under Maintenance"],
      default: "Available"
    },
    description: {
      type: String,
      default: ""
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    providerName: {
      type: String,
      required: true
    },
    rentalsCount: {
      type: Number,
      default: 0
    },
    totalEarnings: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

const tools = mongoose.model("tools", toolSchema);
module.exports = tools;
