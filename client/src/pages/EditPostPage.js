import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { storage } from "../firebase"; // Import Firebase storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import functions

const EditPostPage = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [currentImageUrl, setCurrentImageUrl] = useState(""); // To display the existing image
  const [newImageFile, setNewImageFile] = useState(null); // To hold the new image file for upload
  const [uploading, setUploading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Fetch the existing post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        const { title, content, imageUrl } = res.data;
        setFormData({ title, content });
        if (imageUrl) {
          setCurrentImageUrl(imageUrl);
        }
      } catch (err) {
        console.error(err);
        alert("Could not fetch post data.");
        navigate("/my-posts");
      }
    };
    fetchPost();
  }, [id, navigate]);

  const onFileChange = (e) => {
    setNewImageFile(e.target.files[0]);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // 2. Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let finalImageUrl = currentImageUrl; // Start with the existing image URL

    // If a new image was selected, upload it to Firebase
    if (newImageFile) {
      const imageRef = ref(
        storage,
        `images/${Date.now()}_${newImageFile.name}`
      );
      try {
        await uploadBytes(imageRef, newImageFile);
        finalImageUrl = await getDownloadURL(imageRef); // Get the new URL
      } catch (err) {
        console.error("Error uploading new image:", err);
        alert("Failed to upload new image.");
        setUploading(false);
        return;
      }
    }

    const updatedPostData = {
      ...formData,
      imageUrl: finalImageUrl,
    };

    // Send the update request to your backend
    try {
      await axios.put(`/api/blogs/${id}`, updatedPostData);
      navigate("/my-posts");
    } catch (error) {
      alert("Failed to update post.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  // 3. Add a function to remove the current image
  const handleRemoveImage = () => {
    setCurrentImageUrl(""); // Clear the image from the state
    // When submitted, the empty `finalImageUrl` will update the database
  };

  return (
    <div className="form-container">
      <h2>Edit Your Post</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={onChange}
          placeholder="Tell your story..."
          required
          rows="10"
        ></textarea>

        {/* --- Image Handling Section --- */}
        <div className="image-edit-section">
          <label>Blog Image</label>
          {currentImageUrl && (
            <div className="image-preview-container">
              <p>Current Image:</p>
              <img
                src={currentImageUrl}
                alt="Current blog post"
                className="image-preview"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="btn-remove-image"
              >
                Remove Image
              </button>
            </div>
          )}

          <label htmlFor="file-upload">
            {currentImageUrl
              ? "Upload a New Image to Replace"
              : "Upload an Image"}
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={onFileChange}
            accept="image/*"
          />
          {newImageFile && <p>New file selected: {newImageFile.name}</p>}
        </div>
        {/* ----------------------------- */}

        <button type="submit" disabled={uploading}>
          {uploading ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
