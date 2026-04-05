import React from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import "../src/Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role"); // 🔐 remove role
    navigate("/"); // 🔄 back to login
  };

  return (
    <nav className="navbar">
      
      {/* 🔥 Logo */}
      <div className="logo">
        <img
          src="https://res.cloudinary.com/dohdiu2s6/image/upload/v1775240145/logo_yup4y5.png"
          width="100px"
          alt="logo"
        />
      </div>

      {/* 🔥 Student Links */}
      <ul className="nav-links">
        <li><Link to="/student">Dashboard</Link></li>
        <li><Link to="/student">Courses</Link></li>
        <li><Link to="/student">Assignments</Link></li>
        <li><Link to="/student">Attendance</Link></li>
      </ul>

      {/* 🔥 Right Side */}
      <div className="nav-right">
        <span className="profile">👤 Profile</span>

        <button onClick={handleLogout} className="logout-btn">
          Logout 🚪
        </button>
      </div>

    </nav>
  );
}

export default Navbar;