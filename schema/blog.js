const mongoose = require("mongoose");
const blogData = new mongoose.Schema(
  {
    blogName: { type: String, required: true },
    blogContent: { type: String, required: true },
    blogPhotos: { type: Array },
    likes: { type: Number, default: 0 },
    userID: { type: String },
  },
  {
    collection: "blogs",
  }
);

module.exports = mongoose.model("blogData", blogData);
