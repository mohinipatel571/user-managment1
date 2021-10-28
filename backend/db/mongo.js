const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userdb");
// useNewUrlParser: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// useFindAndModify: true,
var db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", (err, data) => {
  if (err) {
    console.log("database errr", error);
  } else {
    console.log("connection Succefully");
  }
});

module.exports = db;
