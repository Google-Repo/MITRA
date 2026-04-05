import React from "react";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate(); // ✅ inside component

  const handleLogout = () => {
    localStorage.removeItem("role"); // 🔐 remove role
    navigate("/"); // 🔄 redirect
  };

  return (
    <div>
      <h1>Teacher Dashboard 👨‍🏫</h1>

      <button onClick={handleLogout}>
        Logout 🚪
      </button>
    </div>
  );
};

export default Teacher;