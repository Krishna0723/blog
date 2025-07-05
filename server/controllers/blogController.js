const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;
  try {
    const blogData = {
      title,
      content,
      author: req.user.id,
    };

    if (imageUrl) {
      blogData.imageUrl = imageUrl;
    }

    const newBlog = new Blog(blogData);
    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Build the fields to update
    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    // Explicitly handle imageUrl: allow setting it or un-setting it
    if (imageUrl !== undefined) {
      updateFields.imageUrl = imageUrl;
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    if (blog.author.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ msg: "Blog removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
