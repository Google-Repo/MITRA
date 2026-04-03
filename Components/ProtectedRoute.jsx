import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {
  const userRole = localStorage.getItem("role");

  if (userRole !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;