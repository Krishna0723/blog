const express = require("express");
const authentication = express.Router();
const authData = require("../schema/auth");

authentication.post("/signup", async (req, res) => {
  let email = req.body.email;
  let userData = req.body;
  await authData.findOne({ email: email }).then(async (data) => {
    if (data) {
      res.json({ message: "User already Exist" });
    } else {
      await authData.create(userData).then((err, data) => {
        if (err) {
          res.status(404).json(err);
        } else {
          res.json(data);
        }
      });
    }
  });
});

authentication.post("/login", async (req, res) => {
  //   console.log("hello purna");
  await authData.findOne({ email: req.body.email }).then((data) => {
    if (data) {
      console.log(data);
      if (req.body.password !== data.password) {
        res.json({ msg: "invalid password" });
      } else {
        res.cookie("jwt", data.password);
        res.status(200).json({ msg: "munduku poo" });
      }
    } else {
      console.log("Please SignUp First");
      res.json({ msg: "please sign up first" });
    }
  });
});

module.exports = authentication;
