// Dependencies.

const express = require("express");
const ObjectID = require("mongodb").ObjectID;
const multer = require("multer");
const driver = express.Router();
const Driver = require("../models/drivers");

// Configuration of multer

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

/*-------- storage driver image--------*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime Type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/drivers");
  },
  filename: (req, file, cb) => {
    // name.
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    // extension.
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

var upload = multer({
  storage: storage
});
var multipleUpload = upload.fields([{
    name: "image1",
    maxCount: 1
  },
  {
    name: "image2",
    maxCount: 1
  }
]);
/*-------------------------- drivers -------------------------- */

driver.post("/add", multipleUpload, (req, res, next) => {
  console.log(req);
  const url = req.protocol + "://" + req.get("host");
  const driver = new Driver({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    contact: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    vehicle: req.body.vehicle,
    image1: url + "/images/drivers/" + req.files.image1[0].filename,
    image2: url + "/images/drivers/" + req.files.image2[0].filename
  });

  Driver.findOne({
    email: req.body.email
  }, (err, doc) => {
    if (err) {
      res.status(500).json({
        message: `error : ${err}`
      });
    } else {
      if (doc) {
        res.status(400).json({
          message: 'this email id is already registered, try with new email Id'
        });
      } else {
        driver.save().then((driver) => {
          res.status(201).json({
            message: "Driver added succeffully",
            driverId: driver._id
          });
        });
      }
    }
  });
});

// driver.put("/:id", multer({
//   storage: storage_image
// }).single("image1"), multer({
//   storage: storage_license
// }).single("image2"), (req, res, next) => {

// });

// driver.get("/getAll", (req, res) => {

// });

// driver.get("/:id", (req, res) => {

// });

// driver.delete("/:id", (req, res) => {

// });

module.exports = driver;
