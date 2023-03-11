const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  car: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Car" },
  //   user: { type: mongoose.Schema.Types.ObjectId, required: true },
  tripStart: { type: Date, required: true },
  tripEnd: { type: Date, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

const BookingModel = mongoose.model("Booking", bookingSchema);

module.exports = BookingModel;
