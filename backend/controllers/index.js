const Vehicle = require("../models/Vehicle");

export const addVehicle = async (req, res) => {
  try {
    const { vehicleName, status } = req.body;
    const newVehicle = new Vehicle({ vehicleName, status });
    await newVehicle.save();
    res
      .status(201)
      .json({ message: "Vehicle added successfully", vehicle: newVehicle });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding vehicle", error: err.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params.id;
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true } // Return the updated document
    );
    if (!updatedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating vehicle", error: err.message });
  }
};

export const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ updatedAt: -1 }); 
    res.status(200).json(vehicles);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching vehicles", error: err.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);
    if (!deletedVehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({
      message: "Vehicle deleted successfully",
      vehicle: deletedVehicle,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting vehicle", error: error.message });
  }
};
