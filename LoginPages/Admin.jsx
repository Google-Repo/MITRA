import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Admin.css";

const processChartData = (students, teachers) => {
  const dateMap = {};

  const addToMap = (list, type) => {
    list.forEach((item) => {
      // Check for created_at, createdAt, or fallback to current date if missing
      const timestamp = item.created_at || item.createdAt || new Date();

      const dateObj = new Date(timestamp);
      if (isNaN(dateObj.getTime())) return; // skip invalid dates

      // Format as YYYY-MM-DD for reliable sorting
      const dateStr = dateObj.toISOString().split("T")[0];
      if (!dateMap[dateStr]) {
        dateMap[dateStr] = { dateStr, students: 0, teachers: 0 };
      }
      dateMap[dateStr][type] += 1;
    });
  };

  addToMap(students, "students");
  addToMap(teachers, "teachers");

  // Sort sequentially by date string
  const sortedData = Object.values(dateMap).sort((a, b) =>
    a.dateStr.localeCompare(b.dateStr),
  );

  let cumulativeStudents = 0;
  let cumulativeTeachers = 0;

  // Calculate cumulative counts to show total growth over time
  return sortedData.map((data) => {
    cumulativeStudents += data.students;
    cumulativeTeachers += data.teachers;
    return {
      name: new Date(data.dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      Students: cumulativeStudents,
      Teachers: cumulativeTeachers,
    };
  });
};

const Admin = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get current admin user details from local storage
  const adminUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // Protect route: Redirect if not logged in as admin
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      navigate("/admin-login");
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const API_BASE_URL = "http://192.168.1.16:8080/api";

        // Fetch all students and teachers concurrently
        const [studentRes, teacherRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/student`),
          axios.get(`${API_BASE_URL}/teacher`),
        ]);

        // Depending on your Java backend response format, it might be an array directly or inside a property
        setStudents(
          Array.isArray(studentRes.data)
            ? studentRes.data
            : studentRes.data.students || [],
        );
        setTeachers(
          Array.isArray(teacherRes.data)
            ? teacherRes.data
            : teacherRes.data.teachers || [],
        );
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteTeacher = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this teacher from the database?",
      )
    )
      return;

    try {
      const API_BASE_URL = "http://192.168.1.16:8080/api";
      await axios.delete(`${API_BASE_URL}/teacher/delete?id=${id}`);
      setTeachers((prev) => prev.filter((t) => t.id !== id));
      alert("Teacher removed successfully.");
    } catch (err) {
      console.error("Error deleting teacher:", err);
      alert("Failed to delete teacher.");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this student from the database?",
      )
    )
      return;

    try {
      const API_BASE_URL = "http://192.168.1.16:8080/api";
      await axios.delete(`${API_BASE_URL}/student/delete?id=${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      alert("Student removed successfully.");
    } catch (err) {
      console.error("Error deleting student:", err);
      alert("Failed to delete student.");
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading Dashboard Data...</div>;
  }

  // Get recently joined (Sort by created_at descending, take top 5)
  const recentStudents = [...students]
    .sort(
      (a, b) =>
        new Date(b.created_at || b.createdAt || 0) -
        new Date(a.created_at || a.createdAt || 0),
    )
    .slice(0, 5);

  const recentTeachers = [...teachers]
    .sort(
      (a, b) =>
        new Date(b.created_at || b.createdAt || 0) -
        new Date(a.created_at || a.createdAt || 0),
    )
    .slice(0, 5);

  const chartData = processChartData(students, teachers);

  return (
    <div className="admin-dashboard-container">
      {/* Navigation Sidebar / Header */}
      <header className="admin-header">
        <div className="admin-logo">
          <h2>🛡️ Admin Portal</h2>
        </div>
        <div className="admin-profile">
          <span>
            Welcome, <strong>{adminUser.name || "Admin"}</strong>
          </span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      {error && <div className="admin-error-banner">{error}</div>}

      <main className="admin-main-content">
        {/* Key Statistics */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-number">{students.length}</p>
          </div>
          <div className="stat-card">
            <h3>Total Teachers</h3>
            <p className="stat-number">{teachers.length}</p>
          </div>
        </div>

        {/* Growth Chart Section */}
        <div className="chart-section">
          <h3>📈 User Growth Overview</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Students"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
                <Line
                  type="monotone"
                  dataKey="Teachers"
                  stroke="#10b981"
                  strokeWidth={3}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recently Joined Section */}
        <div className="recent-section">
          <div className="recent-card">
            <h3>🆕 Recently Joined Students</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll No</th>
                  <th>Course</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentStudents.length > 0 ? (
                  recentStudents.map((s) => (
                    <tr key={s.id}>
                      <td>{s.name}</td>
                      <td>{s.email}</td>
                      <td>{s.roll_no || s.rollNo}</td>
                      <td>{s.course}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteStudent(s.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="recent-card">
            <h3>🆕 Recently Joined Teachers</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Emp ID</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTeachers.length > 0 ? (
                  recentTeachers.map((t) => (
                    <tr key={t.id}>
                      <td>{t.name}</td>
                      <td>{t.email}</td>
                      <td>{t.employee_id || t.employeeId}</td>
                      <td>{t.subject}</td>
                      <td>
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteTeacher(t.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No teachers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Database Viewer */}
        <div className="database-section">
          <h3>📚 Full Student Database</h3>
          <div className="table-wrapper">
            <table className="admin-table full-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roll No</th>
                  <th>Course</th>
                  <th>Joined Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.roll_no || s.rollNo}</td>
                    <td>{s.course}</td>
                    <td>
                      {new Date(
                        s.created_at || s.createdAt || new Date(),
                      ).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteStudent(s.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Full Teacher Database Viewer */}
        <div className="database-section" style={{ marginTop: "30px" }}>
          <h3>📚 Full Teacher Database</h3>
          <div className="table-wrapper">
            <table className="admin-table full-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Emp ID</th>
                  <th>Department</th>
                  <th>Subject</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>
                    <td>{t.name}</td>
                    <td>{t.email}</td>
                    <td>{t.employee_id || t.employeeId}</td>
                    <td>{t.department}</td>
                    <td>{t.subject}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteTeacher(t.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
