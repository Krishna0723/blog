const express = require("express");
const postBlog = express.Router();
const blogData = require("../schema/blog");

postBlog.post("/postBlog", async (req, res) => {
  console.log(req.body);
  await blogData.create(req.body).then((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});
module.exports = postBlog;
