require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const vehicleRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/api/vehicles", vehicleRoutes);

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.error(err));

