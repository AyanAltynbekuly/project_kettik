const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  features: [String],
  extra: String,
  tripStart: String,
  tripEnd: String,
  pickUpLocation: String,
  price: Number,
});

const CarsModel = mongoose.model("Cars", carsSchema);

module.exports = CarsModel;
