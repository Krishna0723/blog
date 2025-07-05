import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./MyPostsPage.css";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get("/api/blogs/my/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/api/blogs/${postId}`);
        setPosts(posts.filter((post) => post._id !== postId));
      } catch (err) {
        console.error("Failed to delete post", err);
        alert("Failed to delete post.");
      }
    }
  };

  if (loading) return <div>Loading your posts...</div>;

  return (
    <div className="container">
      <h1>My Posts</h1>
      {posts.length > 0 ? (
        <div className="posts-list">
          {posts.map((post) => (
            <div key={post._id} className="my-post-item">
              <h3>{post.title}</h3>
              <div className="post-actions">
                <Link to={`/edit-post/${post._id}`} className="btn btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You haven't created any posts yet.</p>
      )}
    </div>
  );
};

export default MyPostsPage;
