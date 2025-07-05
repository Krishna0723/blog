import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading posts...</div>;

  return (
    <div className="container">
      <h1>Latest Posts</h1>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-post-summary">
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="blog-summary-image"
              />
            )}
            <h2>
              <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
            </h2>
            <p>{blog.content.substring(0, 150)}...</p>
            <small>
              Posted on {new Date(blog.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      ) : (
        <p>No posts yet. Be the first to post!</p>
      )}
    </div>
  );
};

export default HomePage;
