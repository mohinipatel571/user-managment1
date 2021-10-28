const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/mongo");
const userschema = require("../db/mogooseschema");
const fs = require("fs");

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    );
    next();
  })
  .get((req, res, next) => {
    // res.setHeader("Access-Control-Allow-Origin", "*");
    db.collection("users")
      .find()
      .toArray()
      .then((result) => {
        console.log(result);
        res.json(result);
      })
      .catch((err) => {
        res.json({ error: err.message });
      });
  })

  .post((req, res, next) => {
    // const userData = req.body;
    const currentDate = Date.now();
    console.log("patel", req);
    // console.log("mona", req);

    db.collection("users")
      .findOne({ email: req.body.email })
      .then((users) => {
        console.log(users);
        if (users) {
          return res.status(200).json({ message: "email already exists " });
        } else {
          if (req.files) {
            req.files.myimage.mv(
              `${__dirname}/../public/images/${currentDate}${req.files.myimage.name}`,
              (err) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send(err);
                }
              }
            );
          }

          const profile = `images/${currentDate}${req.files.myimage.name}`;
          const userData = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            image: profile,
          };
          db.collection("users")
            .insertOne(userschema(userData))
            .then(() => {
              console.log("Signup Successfully");
              res.status(200).json({ message: "Signup Successfully***" });
            })
            .catch((err) => {
              res.status(200).json({ message: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(200).json({ message: err.message });
      });
  })
  .put(async (req, res, next) => {
    const updatedata = {
      fname: req.body.fname,
      lname: req.body.lname,
      phone: req.body.phone,
    };
    db.collection("users")
      .updateOne({ email: req.body.email }, { $set: updatedata })
      .then(() => {
        res.status(200).json({ message: "Record Update" });
      })
      .catch((error) => {
        res.status(400).send(error);
      });
  })
  .delete((req, res, next) => {
    // console.log(req);
    // console.log("fxgfdhfg", req.body);
    // console.log("hhh", req.params);

    // delete a file
    db.collection("users")
      .findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          // console.log("mfnmnfm", users);
          fs.unlink(`public/${user.image}`, (err) => {
            if (err) {
              throw err;
            }

            console.log("File is deleted.");
          });
          db.collection("users")

            .deleteOne({ email: req.body.email })
            .then(() => {
              res.status(200).json({ message: "Data Deleted from database" });
            })
            .catch((err) => {
              res.status(400).send(err);
            });
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });

module.exports = userRouter;
