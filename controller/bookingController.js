const bookings = require("../models/bookingModel");
const tools = require("../models/toolModel");

// 1. Get all bookings for tools owned by a specific provider
exports.getProviderBookingsController = async (req, res) => {
  console.log("Inside getProviderBookingsController");
  const { providerId } = req.params;

  try {
    const providerBookings = await bookings.find({ providerId }).sort({ createdAt: -1 });
    res.status(200).json(providerBookings);
  } catch (error) {
    console.log("Error in getProviderBookingsController:", error);
    res.status(500).json(error);
  }
};

// 2. Add a new booking (creates rental record and updates corresponding tool metrics)
exports.addBookingController = async (req, res) => {
  console.log("Inside addBookingController");
  const { toolId, toolName, renterName, startDate, endDate, totalPrice, status, providerId } = req.body;

  if (!toolId || !toolName || !renterName || !startDate || !endDate || !totalPrice || !providerId) {
    return res.status(400).json("Missing required fields for booking");
  }

  try {
    const newBooking = new bookings({
      toolId,
      toolName,
      renterName,
      startDate,
      endDate,
      totalPrice: Number(totalPrice),
      status: status || "Active",
      providerId
    });

    await newBooking.save();

    // Increment rentals count, total earnings, and update status of the tool
    const updatedTool = await tools.findById(toolId);
    if (updatedTool) {
      updatedTool.rentalsCount += 1;
      updatedTool.totalEarnings += Number(totalPrice);
      if (status === "Active" || !status) {
        updatedTool.status = "Rented";
      }
      await updatedTool.save();
    }

    res.status(200).json(newBooking);
  } catch (error) {
    console.log("Error in addBookingController:", error);
    res.status(500).json(error);
  }
};
