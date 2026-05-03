import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";

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
      // Use the same IP as Student/Teacher logins
      const API_URL = "http://192.168.1.16:8080/api/admin";
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save the JWT token and user role
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "admin"); // This helps the ProtectedRoute know the user is an admin
        localStorage.setItem("user", JSON.stringify(data.admin)); // Crucial: Dashboard needs this data!

        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to connect to the server. Is the Java backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-header">
          <h2 className="login-title">Admin Portal 🛡️</h2>
          <p className="login-subtitle">Access your management dashboard</p>
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
          <label>Email Address</label>
          <input
            type="email"
            className="login-input"
            placeholder="admin@example.com"
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
          {loading ? "Logging in..." : "Login to Account"}
        </button>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <p style={{ fontSize: "14px" }}>
            Don't have an account?
            <span
              onClick={() => navigate("/admin-signup")}
              style={{ color: "blue", cursor: "pointer", marginLeft: "5px" }}
            >
              Sign up here
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

export default AdminLogin;
