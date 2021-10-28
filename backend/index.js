const express = require("express");
//const { body, validationResult } = require("express-validator");
const expressValidator = require("express-validator");

const db = require("./db/mongo");
const userRouter = require("./router/userRouter");
const app = express();
const apiRoutes = express.Router();

const port = 8000;
app.use("/api/user", userRouter);
app.use(express.json());
// app.set("views engine", "ejs");
app.get("/", (req, res) => {
  // res.write("<h1>welocome to my first express program</h1>");
  res.send();
  // db.collection("users")
  //   .find()
  //   .toArray()
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log("error");
  //   });
  // res.render("index.ejs", {});
});
// apiRoutes.use(express.expressValidator);

// const validation = require("./middleware/validation");
app
  .get("/signup", (req, res) => {
    res.end({ data: "Temp" });
  })
  .post(
    "/signup",
    // validation.validateSignup,
    // body("email").isEmail(),
    // body("phone").isMobilePhone(), // username must be is email
    // body("password")
    //   .isStrongPassword({
    //     minLength: 8,
    //     minLowercase: 1,
    //     minUppercase: 1,
    //     minNumbers: 1,
    //   })
    //   .withMessage(
    //     "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number"
    //   ),
    (req, res) => {
      // res.write("<h1>welocome to my first express program</h1>");
      //// Finds the validation errors in this request and wraps them in an object with handy functions
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      //   console.log(req.body);
      // }

      var data = {
        name: req.body.name,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
      };

      // db.collection("users").insertOne(data, (err, collection) => {
      //   if (err) {
      //     console.log("db insert error", err);
      //     return res.status(500).send(err);
      //   } else {
      //     return res.status(200).send("sign up successfully");
      //   }
      // });

      //     db.collection("users")
      //       .insertOne(data)
      //       .then(() => {
      //         res.status(400).send("Signup Successfully***");
      //       })
      //       .catch((err) => {
      //         res.status(200).send(err);
      //       });
      //   }
      // );

      // db.collection("users")
      //   .find()
      //   .toArray()
      //   .then((result) => {
      //     console.log(result);
      //   })
      //   .catch((err) => {
      //     console.log("error");
      //   });

      //     db.collection("users")
      //       .updateOne({ name: "Mohini" }, { $set: { name: "Mahi" } })
      //       .then(() => {
      //         res.status(400).send("***Record Updated***");
      //       })
      //       .catch((error) => {
      //         res.status(200).send(error);
      //       });
      //   }
      // );

      //     db.collection("users")
      //       .deleteOne({ password: "Mona" })
      //       .then(() => {
      //         res.status(400).send("Data Deleted from database");
      //       })
      //       .catch((err) => {
      //         res.status(200).send(err);
      //       });
    }
  );

app.listen(port, (req, res) => {
  console.log("Server Started port 8000***");
});
