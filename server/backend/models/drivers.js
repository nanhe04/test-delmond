const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const driverSchema = new Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  contact: String,
  address: String,
  city: String,
  vehicle: String,
  image1: String,
  image2: String
});

const Drivers = mongoose.model("Drivers", driverSchema);

module.exports = Drivers;
