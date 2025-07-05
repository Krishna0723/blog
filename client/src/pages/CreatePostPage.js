import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CreatePostPage = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const onFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let imageUrl = "";

    if (imageFile) {
      const imageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
      try {
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } catch (err) {
        console.error("Error uploading image:", err);
        alert("Failed to upload image.");
        setUploading(false);
        return;
      }
    }

    const postData = {
      ...formData,
      imageUrl: imageUrl,
    };

    try {
      await axios.post("/api/blogs", postData);
      navigate("/");
    } catch (error) {
      alert("Failed to create post.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Create a New Post</h2>
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

        <label htmlFor="file-upload">Upload an Image (Optional)</label>
        <input
          id="file-upload"
          type="file"
          onChange={onFileChange}
          accept="image/*"
        />

        <button type="submit" disabled={uploading}>
          {uploading ? "Publishing..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
