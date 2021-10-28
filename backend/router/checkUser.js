const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const db = require("../db/mongo");

const checkUser = express.Router();
checkUser.use(bodyParser.json());
checkUser
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
  }).post(async (req, res, next) => {
  try {
    let token = req.body.token;
    jwt.verify(token,  "Monaaaabhi", async function (err, decoded) {
      if (err) {
        res.send({
          message: "Login token Expired !",
        });
      }
      db.collection("users")
      .findOne({ _id: decoded }).then((data)=>{
        console.log(data)
        res.json({
          'email':data["0"].email,
          'status':data["0"].status,
          'name':data["0"].name
        });
  
      }).catch(()=>{

      })
    });
  } catch (err) {
    res.json({ status: "Failed" });
  }
});
module.exports = checkUser;
