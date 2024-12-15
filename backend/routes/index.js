const express = require("express");
const router = express.Router();

const {
  addVehicle,
  updateVehicle,
  getVehicles,
  deleteVehicle,
} = require("../controllers/index");


router.post("/add", addVehicle);
router.patch("/:id", updateVehicle);
router.get("/", getVehicles);
router.delete("/:id", deleteVehicle);


module.exports = router;
