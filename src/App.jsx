import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import Admin from "../pages/Admin";
import Login from "../Components/StartLogin";
import ProtectedRoute from "../Components/ProtectedRoute";
import StudentLogin from "../LoginPages/StudentLogin";
import TeacherLogin from "../LoginPages/TeacherLogin";
import AdminLogin from "../LoginPages/AdminLogin";

function Layout() {
  return (
    <>
      <Routes>

        {/* 🔓 Start Page */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Student Login Page */}
        <Route path="/student-login" element={<StudentLogin />} />

        {/* 🔐 Protected Student Dashboard */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <Student />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Teacher */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRole="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />

        {/* 🔐 Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

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