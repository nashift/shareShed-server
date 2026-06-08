const tools = require("../models/toolModel");

// 1. Add a new tool
exports.addToolController = async (req, res) => {
  console.log("Inside addToolController");
  const { name, brand, category, pricePerDay, image, description, providerId, providerName } = req.body;

  if (!name || !brand || !category || !pricePerDay || !providerId || !providerName) {
    return res.status(400).json("Missing required fields for listing a tool");
  }

  try {
    const newTool = new tools({
      name,
      brand,
      category,
      pricePerDay: Number(pricePerDay),
      image: image || "/tool3.png",
      description: description || "",
      providerId,
      providerName,
      status: "Available",
      rating: 5.0,
      rentalsCount: 0,
      totalEarnings: 0
    });

    await newTool.save();
    res.status(200).json(newTool);
  } catch (error) {
    console.log("Error in addToolController:", error);
    res.status(500).json(error);
  }
};

// 2. Get tools listed by a specific provider
exports.getProviderToolsController = async (req, res) => {
  console.log("Inside getProviderToolsController");
  const { providerId } = req.params;

  try {
    const providerTools = await tools.find({ providerId });
    res.status(200).json(providerTools);
  } catch (error) {
    console.log("Error in getProviderToolsController:", error);
    res.status(500).json(error);
  }
};

// 3. Update tool details (or status toggle)
exports.updateToolController = async (req, res) => {
  console.log("Inside updateToolController");
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedTool = await tools.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedTool) {
      return res.status(404).json("Tool not found");
    }
    res.status(200).json(updatedTool);
  } catch (error) {
    console.log("Error in updateToolController:", error);
    res.status(500).json(error);
  }
};

// 4. Delete a tool
exports.deleteToolController = async (req, res) => {
  console.log("Inside deleteToolController");
  const { id } = req.params;

  try {
    const deletedTool = await tools.findByIdAndDelete(id);
    if (!deletedTool) {
      return res.status(404).json("Tool not found");
    }
    res.status(200).json(deletedTool);
  } catch (error) {
    console.log("Error in deleteToolController:", error);
    res.status(500).json(error);
  }
};

// 5. Get all tools (public/all user view)
exports.getAllToolsController = async (req, res) => {
  console.log("Inside getAllToolsController");
  const searchKey = req.query.search || "";
  
  try {
    const query = {
      name: { $regex: searchKey, $options: "i" }
    };
    const allTools = await tools.find(query);
    res.status(200).json(allTools);
  } catch (error) {
    console.log("Error in getAllToolsController:", error);
    res.status(500).json(error);
  }
};
