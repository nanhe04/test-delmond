// dependencies.
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// local modules.
const {
  mongoose
} = require('./db/mongoose');

// routers
const users = require('./routers/users');
const admins = require('./routers/admins');
const drivers = require('./routers/drivers');
const app = express();



// body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use("/images", express.static(path.join("backend/images")));
// headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Routes.

app.use('/admin', admins);
app.use('/user', users);
app.use('/driver', drivers);

module.exports = app;
