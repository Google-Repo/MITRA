import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import Admin from "../pages/Admin";
import Login from "../pages/login";
import ProtectedRoute from "../Components/ProtectedRoute";

function Layout() {
  const location = useLocation();

  
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />} {/* 🔥 condition */}

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <Student />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRole="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;