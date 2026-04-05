import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const userRole = localStorage.getItem("role");

  if (userRole !== allowedRole) {
    if (allowedRole === "student") return <Navigate to="/student-login" />;
    if (allowedRole === "teacher") return <Navigate to="/teacher-login" />;
    if (allowedRole === "admin") return <Navigate to="/admin-login" />;

    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;