const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    index: true,
    require: true,
  },
  lname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: {
      unique: true,
    },
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: Number,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

// validation

// A Mongoose Model is a Wrapper On the Mongoose Schema.
// A Mongoose Schema define the structure of the document
//define the va,ues ,validator etc where a mongoose modelprovide an interface to the database for creating,querying ,updating ,deleteting record etc.
// Collection Creation

const userschema = new mongoose.model("users", UserSchema);
module.exports = userschema;
