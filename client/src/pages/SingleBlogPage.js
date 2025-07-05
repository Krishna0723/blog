import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleBlogPage = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog", error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (!blog) return <div>Post not found.</div>;

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <small>Posted on {new Date(blog.createdAt).toLocaleString()}</small>
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt={blog.title} className="blog-full-image" />
      )}
      <div className="blog-content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default SingleBlogPage;
