const mongoose = require("mongoose");
const authData = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { collection: "user" }
);

module.exports = mongoose.model("authData", authData);
