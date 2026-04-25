import React from "react";
import { useNavigate } from "react-router-dom";
import "../StartLogin.css";

const StartLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="main">
      {/* Logo */}
      <div className="logo-wrapper">
        <img
          src="https://res.cloudinary.com/dohdiu2s6/image/upload/v1775240145/logo_yup4y5.png"
          alt="MITRA Logo"
          className="logo-img"
        />
      </div>

      {/* Buttons */}
      <div className="buttons">
        {/* Student Section */}
        <div style={{ marginBottom: "20px" }}>
          <button
            className="login-btn"
            onClick={() => navigate("/student-login")}
          >
            STUDENT LOGIN
          </button>
        </div>

        {/* Teacher Section */}
        <div style={{ marginBottom: "20px" }}>
          <button
            className="login-btn"
            onClick={() => navigate("/teacher-login")}
          >
            TEACHER LOGIN
          </button>
        </div>

        {/* Admin Section */}
        <div>
          <button
            className="login-btn"
            onClick={() => navigate("/admin-login")}
          >
            ADMIN LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartLogin;
