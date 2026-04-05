import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔐 Dummy credentials
    if (email === "teacher@gmail.com" && password === "1234") {
      localStorage.setItem("role", "teacher");
      navigate("/teacher");
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div>
      <h2>Teacher Login 👨‍🏫</h2>

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

export default TeacherLogin;