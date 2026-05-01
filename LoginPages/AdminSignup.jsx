import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";
import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminId: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminId: formData.adminId,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.admin));
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } catch (error) {
      setError(
        error.response?.data?.error || "Signup failed. Please try again.",
      );
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSignup}>
        <div className="login-header">
          <h2 className="login-title">Admin Registration 🛠️</h2>
          <p className="login-subtitle">Create admin account</p>
        </div>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "10px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            className="login-input"
            placeholder="Admin Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="admin@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Admin ID</label>
          <input
            type="text"
            name="adminId"
            className="login-input"
            placeholder="ADMIN001"
            value={formData.adminId}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="At least 6 characters"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="login-input"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="login-btn-submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p style={{ fontSize: "14px" }}>
            Already have an account?
            <span
              onClick={() => navigate("/admin-login")}
              style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            >
              Login here
            </span>
          </p>
        </div>

        <div className="back-link" onClick={() => navigate("/")}>
          ← Back to selection
        </div>
      </form>
    </div>
  );
};

export default AdminSignup;
