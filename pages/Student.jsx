import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar"; // ✅ add this
import "../src/student.css";

const Student = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>

      {/* 🔥 Navbar */}
      <Navbar />

      {/* Page Content */}
      <h1>Student Dashboard 🎓</h1>

      <button onClick={handleLogout}>
        Logout 🚪
      </button>

    </div>
  );
};

export default Student;