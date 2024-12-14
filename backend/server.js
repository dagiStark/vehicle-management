require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const vehicleRoutes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

app.use("/api/vehicles", vehicleRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log(`Server running on port ${PORT}`);
    })
  )
  .catch((err) => console.error(err));

// Routes
