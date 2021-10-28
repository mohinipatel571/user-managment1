const express = require("express");
const bodyParser = require("body-parser");
const db = require("../db/mongo");
const userschema = require("../db/mogooseschema");
const jwt = require("jsonwebtoken");
const userLogin = express.Router();
userLogin.use(bodyParser.json());

userLogin.route("/").all((req, res, next) => {
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
});
userLogin.post("/", (req, res) => {
  let { email, password } = req.body;
  db.collection("users")
    .findOne({ email: req.body.email })
    .then((users) => {
      if (!users) {
        console.log("not found");
        return res.status(404).json({
          errors: [{ users: "not found" }],
        });
      } else {
        if (password !== users.password) {
          console.log("incorect");
          return res.status(401).json({ errors: [{ password: "incorrect" }] });
        }
      }
      if (password) {
        const token = jwt.sign(
          {
            email: users.email,
            password: users.password,
          },
          "Monaaaabhi"
        );
        console.log("ok");
        return res.json({ status: "ok", userData: users, token });
      } else {
        console.log("eeor");
        return res.json({ status: "error", user: false });
      }
    });
});

module.exports = userLogin;
