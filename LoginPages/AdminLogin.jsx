import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";
import axios from "axios";

const API_URL = "http://localhost:8080/api/admin";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.admin));
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed. Please try again.",
      );
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-header">
          <h2 className="login-title">Admin Portal 🛠️</h2>
          <p className="login-subtitle">Sign in to manage the system</p>
        </div>

        {error && (
          <div
            style={{ color: "red", marginBottom: "10px", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        <div className="input-group">
          <label>Email Address</label>
          <input
            type="email"
            className="login-input"
            placeholder="admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            className="login-input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" className="login-btn-submit" disabled={loading}>
          {loading ? "Logging in..." : "Login to Dashboard"}
        </button>

        <div className="back-link" onClick={() => navigate("/")}>
          ← Back to selection
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
