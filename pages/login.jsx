import { useNavigate } from "react-router-dom";
import "../src/Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("role", role); // 🔐 save role

    if (role === "student") navigate("/student");
    else if (role === "teacher") navigate("/teacher");
    else if (role === "admin") navigate("/admin");
  };

  return (
    <div className="login-container">
      
      {/* Logo */}
      <img
        src="https://res.cloudinary.com/dohdiu2s6/image/upload/v1775240145/logo_yup4y5.png"
        alt="logo"
        className="logo"
      />

      {/* Buttons */}
      <div className="login-buttons">
        <button onClick={() => handleLogin("student")}>
          Student Login 🎓
        </button>

        <button onClick={() => handleLogin("teacher")}>
          Teacher Login 👨‍🏫
        </button>

        <button onClick={() => handleLogin("admin")}>
          Admin Login 🛠️
        </button>
      </div>

    </div>
  );
}

export default Login;