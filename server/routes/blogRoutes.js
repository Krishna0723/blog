const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const auth = require("../middleware/auth");

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

router.post("/", auth, createBlog);

router.get("/my/posts", auth, getMyBlogs);

router.put("/:id", auth, updateBlog);

router.delete("/:id", auth, deleteBlog);

module.exports = router;
