import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Student from "../pages/Student";
import Teacher from "../pages/Teacher";
import Admin from "../LoginPages/Admin";
import Login from "../Components/StartLogin";
import ProtectedRoute from "../Components/ProtectedRoute";
import StudentLogin from "../LoginPages/StudentLogin";
import TeacherLogin from "../LoginPages/TeacherLogin";
import AdminLogin from "../LoginPages/AdminLogin";
import StudentSignup from "../LoginPages/StudentSignup";
import TeacherSignup from "../LoginPages/TeacherSignup";
import AdminSignup from "../LoginPages/AdminSignup";

function Layout() {
  return (
    <>
      <Routes>
        {/* 🔓 Start Page */}
        <Route path="/" element={<Login />} />

        {/* 🔐 Student Login Page */}
        <Route path="/student-login" element={<StudentLogin />} />

        {/* 🔐 Student Signup Page */}
        <Route path="/student-signup" element={<StudentSignup />} />

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

        {/* 🔐 Teacher Login Page */}
        <Route path="/teacher-login" element={<TeacherLogin />} />

        {/* 🔐 Teacher Signup Page */}
        <Route path="/teacher-signup" element={<TeacherSignup />} />

        {/* 🔐 Admin Login Page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* 🔐 Admin Signup Page */}
        <Route path="/admin-signup" element={<AdminSignup />} />
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
