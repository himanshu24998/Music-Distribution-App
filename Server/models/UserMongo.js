const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  name: { type: String },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;
