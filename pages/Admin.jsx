import React from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div>
      <h1>Admin Dashboard 🛠️</h1>

      <button onClick={handleLogout}>
        Logout 🚪
      </button>
    </div>
  );
};

export default Admin;