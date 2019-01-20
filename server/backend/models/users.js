const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

  name: String,
  email: String,
  image: String,
  username: String,
  password: String,
  mobile: String,
  address: String,
  google_address: String,
  latitude: Number,
  longitude: Number,
  city: String,
  facebook_id: String,
  added_by: Object,
  created_date: String,
  status: Number
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
