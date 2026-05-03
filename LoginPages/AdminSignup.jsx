import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    adminId: "", // Maps to admin_id in the database
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => {
      const newData = { ...prev, [e.target.name]: e.target.value };

      // Auto-generate official email ID based on Name and Admin ID
      if (e.target.name === "name" || e.target.name === "adminId") {
        const firstName = newData.name
          ? newData.name
              .split(" ")[0]
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "")
          : "admin";
        const id = newData.adminId
          ? newData.adminId.toLowerCase().replace(/[^a-z0-9]/g, "")
          : "";
        if (firstName && id) {
          newData.email = `${firstName}.${id}@mitra.edu`;
        } else {
          newData.email = "";
        }
      }
      return newData;
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use the same IP as Student/Teacher logins
      const API_URL = "http://192.168.1.16:8080/api/admin";
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Admin account created successfully! Please login.");
        navigate("/admin-login");
      } else {
        setError(
          data.message ||
            "Failed to create account. Email or Admin ID might already exist.",
        );
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to connect to the server. Is the Java backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSignup}>
        <div className="login-header">
          <h2 className="login-title">Admin Registration 🛡️</h2>
          <p className="login-subtitle">Create your admin account</p>
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
            placeholder="Jane Doe"
            value={formData.name}
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
            placeholder="ADM123"
            value={formData.adminId}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Official Email ID (Auto-generated)</label>
          <input
            type="email"
            name="email"
            className="login-input"
            placeholder="Auto-generated"
            value={formData.email}
            readOnly
            style={{
              backgroundColor: "rgba(15, 17, 21, 0.4)",
              cursor: "not-allowed",
            }}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="login-input"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="login-btn-submit" disabled={loading}>
          {loading ? "Registering..." : "Create Account"}
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
