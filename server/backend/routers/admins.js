// dependencies.
const express = require('express');
const Admin = require("../models/admins");

const admin = express.Router();


/*----------------------- admins ------------------------ */
admin.post("/login", (req, res, next) => {

  Admin.findOne({
      username: req.body.username,
      password: req.body.password,
      status: 1
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({
          message: `error: ${err}`
        });
      } else {
        if (doc) {
          res.status(200).json({
            message: "Login Successfully"
          });
        } else {
          res.status(400).json({
            message: "Bad Request, Please try again"
          });
        }
      }
    }
  );
});

admin.post("/logout", (req, res, next) => {
  res.status(200).json({
    message: "Logout Successfully"
  });
});


module.exports = admin;
