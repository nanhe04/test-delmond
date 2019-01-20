const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  status: Number
});

const Admins = mongoose.model('Admins', adminSchema);
module.exports = Admins;
