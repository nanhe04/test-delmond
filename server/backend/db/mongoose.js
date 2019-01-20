const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
// database
mongoose
  .connect(
    "mongodb://localhost/Delmond", {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

module.exports = {
  mongoose
};
