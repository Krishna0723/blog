const express = require("express");
const postBlog = express.Router();
const blogData = require("../schema/blog");
const authData = require("../schema/auth");

postBlog.post("/postBlog", async (req, res) => {
  await blogData.create(req.body).then((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

postBlog.get("/getBlogs", async (req, res) => {
  await blogData.find().then((err, data) => {
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(500).json(err);
    }
  });
});

postBlog.post("/blogToUser/:id", async (req, res) => {
  let userId2 = req.params.id;
  let data2 = req.body;
  authData.findById(userId2).then(async (data) => {
    let postId = await req.body._id;
    console.log(postId);
    await blogData.findById(postId).then(async (post) => {
      console.log(post);
      post.userID = userId2;
      await post.save();
      res.status(200).json(post);
    });
    data2.userID = userId2;
    await data.yourBlogs.push(data2);
    console.log(data.yourBlogs);
    console.log(req.body);
    await data.save();
  });
});

module.exports = postBlog;
