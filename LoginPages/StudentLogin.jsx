import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPages.css";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 🔐 Dummy credentials
    if (email === "student@gmail.com" && password === "1234") {
      localStorage.setItem("role", "student"); // ✅ set role
      navigate("/student"); // ✅ open student page
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-header">
          <h2 className="login-title">Student Portal 🎓</h2>
          <p className="login-subtitle">Access your courses and materials</p>
        </div>

        <div className="input-group">
          <label>Student Email</label>
          <input
            type="email"
            className="login-input"
            placeholder="student@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
          />
        </div>

        <button type="submit" className="login-btn-submit">Login to Account</button>
        
        <div className="back-link" onClick={() => navigate("/")}>
          ← Back to selection
        </div>
      </form>
    </div>
  );
};

export default StudentLogin;