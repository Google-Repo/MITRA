import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";
import axios from "axios";

const API_URL = "http://localhost:5000/api/teachers";

const TeacherLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    department: "",
    subject: "",
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.teacher));
      localStorage.setItem("role", "teacher");
      navigate("/teacher");
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed. Please try again.",
      );
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
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
        employeeId: formData.employeeId,
        department: formData.department,
        subject: formData.subject,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.teacher));
      localStorage.setItem("role", "teacher");
      navigate("/teacher");
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
      <form
        className="login-card"
        onSubmit={isSignup ? handleSignup : handleLogin}
      >
        <div className="login-header">
          <h2 className="login-title">Teacher Portal 👨‍🏫</h2>
          <p className="login-subtitle">
            {isSignup
              ? "Create your teacher account"
              : "Access your dashboard and classes"}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setIsSignup(false);
              setError("");
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                employeeId: "",
                department: "",
                subject: "",
              });
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: !isSignup ? "#007bff" : "#e9ecef",
              color: !isSignup ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setIsSignup(true);
              setError("");
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                employeeId: "",
                department: "",
                subject: "",
              });
            }}
            style={{
              padding: "8px 16px",
              backgroundColor: isSignup ? "#28a745" : "#e9ecef",
              color: isSignup ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Signup
          </button>
        </div>

        {error && (
          <div
            style={{ color: "red", marginBottom: "10px", textAlign: "center" }}
          >
            {error}
          </div>
        )}

        {isSignup ? (
          <>
            <div className="input-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                className="login-input"
                placeholder="Prof. Alan Turing"
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
                placeholder="teacher@mitra.edu"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Employee ID</label>
              <input
                type="text"
                name="employeeId"
                className="login-input"
                placeholder="EMP123"
                value={formData.employeeId}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                className="login-input"
                placeholder="Computer Science"
                value={formData.department}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                className="login-input"
                placeholder="Data Structures"
                value={formData.subject}
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

            <button
              type="submit"
              className="login-btn-submit"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </>
        ) : (
          <>
            <div className="input-group">
              <label>Teacher Email</label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="teacher@mitra.edu"
                value={formData.email}
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
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="login-btn-submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login to Account"}
            </button>
          </>
        )}

        <div className="back-link" onClick={() => navigate("/")}>
          ← Back to selection
        </div>
      </form>
    </div>
  );
};

export default TeacherLogin;
