import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.endsWith("@vitstudent.ac.in")) {
      alert("Registration is only allowed with a @vitstudent.ac.in email.");
      return;
    }
    try {
      await register(formData);
      navigate("/");
    } catch (error) {
      alert(
        "Registration failed. The email might already be in use or there was a server error."
      );
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <p>Please use your @vitstudent.ac.in email</p>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="VIT Student Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Password"
          required
          minLength="6"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
