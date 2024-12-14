const express = require("express");
const router = express.Router();

const {
  addVehicle,
  updateVehicle,
  getVehicles,
  deleteVehicle,
} = require("../controllers/index");


router.post("/", addVehicle);
router.put("/:id", updateVehicle);
router.get("/", getVehicles);
router.delete("/", deleteVehicle);


module.exports = router;
