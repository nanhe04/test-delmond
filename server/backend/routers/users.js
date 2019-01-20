// dependencies
const express = require('express');
const assert = require('assert');
const User = require('../models/users');
const ObjectID = require('mongodb').ObjectID;
const multer = require('multer');
const user = express.Router();

// configuration of multer.
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images/users");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);

  }
});

/*-------------------------- users -------------------------- */

user.post("/add", multer({
  storage: storage
}).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");

  //console.log(req);
  //console.log(req.file);
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    image: url + "/images/users/" + req.file.filename
  });
  User.findOne({
      email: req.body.email
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({
          message: `error: ${err}`
        });
      } else {
        if (doc) {
          res.status(400).json({
            message: 'this email id is already registerd, try with new email Id'
          });
        } else {
          user.save().then((user) => {
            res.status(201).json({
              message: "User added successfully",
              userId: user._id
            });
          });
        }
      }
    });

});

user.put("/:id", multer({
  storage: storage
}).single("image"), (req, res) => {

  let imagePath = req.body.image;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename
  }
  console.log(req.body);
  const user = new User({
    _id: req.body.id,
    name: req.body.name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    mobile: req.body.contact,
    address: req.body.address,
    city: req.body.city,
    image: imagePath
  });

  User.findOne({
      email: req.body.email
    },
    (err, doc) => {
      if (err) {
        res.status(500).json({
          message: `error: ${err}`
        });
      } else {
        if (doc.length > 1) {
          res.status(400).json({
            message: 'this email id is already registerd, try with new email Id'
          });
        } else {
          User.updateOne({
            _id: req.params.id
          }, user).then((user) => {
            res.status(201).json({
              message: "User updated successfully",
              userId: user._id
            });
          });
        }
      }
    });

});


user.get("/getAll", (req, res) => {
  User.find((err, data) => {
    if (err) {
      res.status(500).json({
        message: `error : ${err}`
      });
    } else {
      res.status(200).json({
        data: data
      });
    }
  })
});

user.get("/:id", (req, res) => {

  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).send()
  }
  User.findById(id).then((doc) => {
    if (!doc) {
      res.status(404).json({

      });
    }
    res.status(200).json({
      doc
    });
  }).catch((e) => {
    res.status(400).json({
      e
    });
  });
});

user.delete("/:id", (req, res) => {
  var id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(400).json({
      err: 'id is not valid'
    });
  }

  User.findByIdAndDelete({
    _id: id
  }).then((doc) => {
    if (!doc) {
      return res.status(404).json({
        message: 'document is not available'
      });
    }
    res.status(200).json({
      doc
    });
  }).catch((e) => {
    e
  });

});

module.exports = user;
