const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    toolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tools",
      required: true
    },
    toolName: {
      type: String,
      required: true
    },
    renterName: {
      type: String,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    endDate: {
      type: String,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Pending"],
      default: "Active"
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    }
  },
  { timestamps: true }
);

const bookings = mongoose.model("bookings", bookingSchema);
module.exports = bookings;
