import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔐 Dummy credentials
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div>
      <h2>Admin Login 🛠️</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AdminLogin;