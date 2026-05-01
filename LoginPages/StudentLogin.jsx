import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";
import axios from "axios";

const API_URL = "http://localhost:8080/api/student";

const StudentLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rollNo: "",
    course: "",
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
      localStorage.setItem("user", JSON.stringify(response.data.student));
      localStorage.setItem("role", "student");
      navigate("/student");
    } catch (error) {
      setError(
        error.response?.data?.error || "Login failed. Please try again.",
      );
      console.error("Login failed:", error);
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
        rollNo: formData.rollNo,
        course: formData.course,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.student));
      localStorage.setItem("role", "student");
      navigate("/student");
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
          <h2 className="login-title">Student Portal 🎓</h2>
          <p className="login-subtitle">
            {isSignup
              ? "Create your account"
              : "Access your courses and materials"}
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
                rollNo: "",
                course: "",
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
                rollNo: "",
                course: "",
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
                placeholder="John Doe"
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
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Roll Number</label>
              <input
                type="text"
                name="rollNo"
                className="login-input"
                placeholder="2024001"
                value={formData.rollNo}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="input-group">
              <label>Course</label>
              <select
                name="course"
                className="login-input"
                value={formData.course}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select a course</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Business Administration">
                  Business Administration
                </option>
              </select>
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
              <label>Student Email</label>
              <input
                type="email"
                name="email"
                className="login-input"
                placeholder="student@gmail.com"
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

export default StudentLogin;
