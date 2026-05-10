import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../src/StudentDashboard.css"; // Reuse your amazing dashboard CSS!

const Teacher = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [timetableData, setTimetableData] = useState([]);
  const [timetableForm, setTimetableForm] = useState({
    course: "Computer Application",
    semester: "Sem 4",
    day: "Monday",
    time: "",
    room: "",
    type: "Lecture",
  });

  useEffect(() => {
    // Retrieve user data saved in local storage during login/signup
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setTeacherData(JSON.parse(user));
      } catch (error) {
        console.error("Error parsing user data", error);
        navigate("/teacher-login");
      }
    } else {
      // Agar user login nahi hai, toh seedha login page par bhej do
      navigate("/teacher-login");
    }
  }, [navigate]);

  // Tab change hone par students list fetch karna (Attendance aur Marks ke liye)
  useEffect(() => {
    if (
      (activeSection === "attendance" || activeSection === "marks") &&
      students.length === 0
    ) {
      const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
          const API_BASE_URL = "http://192.168.1.16:8080/api";
          const res = await axios.get(`${API_BASE_URL}/student`);
          const data = Array.isArray(res.data)
            ? res.data
            : res.data.students || [];
          setStudents(data);

          // By default sabko "Present" mark kar dete hain
          const initialAtt = {};
          data.forEach((s) => (initialAtt[s.id || s._id] = "Present"));
          setAttendanceData(initialAtt);
        } catch (err) {
          console.error("Error fetching students:", err);
        } finally {
          setLoadingStudents(false);
        }
      };
      fetchStudents();
    }
  }, [activeSection, students.length]);

  // Date ya tab change hone par us din ka saved attendance fetch karna
  useEffect(() => {
    if (
      activeSection === "attendance" &&
      students.length > 0 &&
      teacherData?.subject
    ) {
      const fetchExistingAttendance = async () => {
        try {
          const API_BASE_URL = "http://192.168.1.16:8080/api";
          // Backend se specific date aur subject ki attendance manga rahe hain
          const res = await axios.get(`${API_BASE_URL}/attendance`, {
            params: { subject: teacherData.subject, date: attendanceDate },
          });

          if (res.data && Object.keys(res.data).length > 0) {
            // Agar us din ki attendance pehle se saved hai, toh wahi dikhao (Present/Absent)
            setAttendanceData(res.data);
          } else {
            // Nayi date hai ya koi data nahi hai, default "Present" set karo
            const initialAtt = {};
            students.forEach((s) => (initialAtt[s.id || s._id] = "Present"));
            setAttendanceData(initialAtt);
          }
        } catch (error) {
          // Agar backend endpoint ready nahi hai toh sabko default Present dikhao
          const initialAtt = {};
          students.forEach((s) => (initialAtt[s.id || s._id] = "Present"));
          setAttendanceData(initialAtt);
        }
      };
      fetchExistingAttendance();
    }
  }, [attendanceDate, activeSection, students, teacherData]);

  const fetchTimetable = async () => {
    if (!teacherData?.name) return;
    try {
      const API_BASE_URL = "http://192.168.1.16:8080/api";
      const res = await axios.get(`${API_BASE_URL}/timetable`, {
        params: { teacherName: teacherData.name },
      });
      setTimetableData(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  useEffect(() => {
    if (activeSection === "timetable" || activeSection === "dashboard") {
      fetchTimetable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection, teacherData]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard Overview" },
    { id: "timetable", icon: "🗓️", label: "My Classes" },
    { id: "attendance", icon: "✅", label: "Mark Attendance" },
    { id: "marks", icon: "📝", label: "Upload Marks" },
  ];

  // State update on P / A click
  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData((prev) => ({ ...prev, [studentId]: status }));
  };

  const submitAttendance = async () => {
    if (new Date(attendanceDate).getDay() === 0) {
      alert("Attendance cannot be marked on Sundays.");
      return;
    }

    const payload = {
      subject: teacherData.subject,
      date: attendanceDate,
      attendance: attendanceData,
    };

    console.log("Submitting Attendance Payload:", payload);

    try {
      await axios.post(
        "http://192.168.1.16:8080/api/attendance/upload",
        payload,
      );
      alert(`Attendance for ${teacherData.subject} saved successfully!`);
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert(
        "Failed to save attendance. Please make sure the Java backend is running.",
      );
    }
  };

  const handleAddTimetable = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...timetableForm,
        subject: teacherData?.subject || "Unknown Subject",
        teacherName: teacherData?.name || "Unknown Teacher",
      };
      await axios.post("http://192.168.1.16:8080/api/timetable", payload);
      alert("Class schedule added successfully!");
      // Fields ko reset karna aur table re-fetch karna
      setTimetableForm({ ...timetableForm, time: "", room: "" });
      fetchTimetable();
    } catch (error) {
      console.error("Error adding timetable:", error);
      alert(
        `Failed to add class schedule: ${error.response?.data?.error || error.message}`,
      );
    }
  };

  const renderDashboard = () => {
    // Calculate today's classes dynamically
    const todayStr = new Date().toLocaleDateString("en-US", {
      weekday: "long",
    });
    const classesToday = timetableData.filter((t) => t.day === todayStr).length;

    return (
      <div className="section-content">
        <div className="section-hero academic-hero">
          <div className="section-hero-icon">👨‍🏫</div>
          <div>
            <h2 className="section-hero-title">
              Welcome, Prof. {teacherData?.name}!
            </h2>
            <p className="section-hero-sub">
              {teacherData?.department} Department • ID:{" "}
              {teacherData?.employeeId}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="academic-stats-row">
          {[
            {
              label: "Classes Today",
              value: classesToday.toString(),
              color: "#10b981",
              icon: "🏫",
            },
            {
              label: "Pending Grading",
              value: "24",
              color: "#6366f1",
              icon: "📂",
            },
            {
              label: "Avg Attendance",
              value: "88%",
              color: "#22c55e",
              icon: "📈",
            },
            { label: "Meetings", value: "1", color: "#f59e0b", icon: "⏰" },
          ].map((s, i) => (
            <div
              className="acad-stat-card"
              key={i}
              style={{ borderTop: `4px solid ${s.color}` }}
            >
              <span className="acad-stat-icon">{s.icon}</span>
              <p className="acad-stat-value" style={{ color: s.color }}>
                {s.value}
              </p>
              <p className="acad-stat-label">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="academic-grid" style={{ marginTop: "24px" }}>
          <div className="academic-card">
            <div className="academic-card-header">
              <span>📚 My Subjects</span>
              <span className="badge blue">Current Sem</span>
            </div>
            <table className="acad-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Course</th>
                  <th>Students</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{teacherData?.subject}</td>
                  <td>Computer Science</td>
                  <td>65</td>
                </tr>
                <tr>
                  <td>Advanced {teacherData?.subject}</td>
                  <td>Information Tech</td>
                  <td>42</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTimetable = () => (
    <div className="section-content">
      <div className="section-hero general-hero">
        <div className="section-hero-icon">🗓️</div>
        <div>
          <h2 className="section-hero-title">My Classes</h2>
          <p className="section-hero-sub">Weekly lecture and lab schedule</p>
        </div>
      </div>

      {/* Timetable Insertion Form */}
      <div className="academic-card" style={{ marginBottom: "20px" }}>
        <div className="academic-card-header">
          <span>➕ Add Class Schedule</span>
        </div>
        <form
          onSubmit={handleAddTimetable}
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            padding: "15px",
          }}
        >
          <select
            value={timetableForm.course}
            onChange={(e) =>
              setTimetableForm({ ...timetableForm, course: e.target.value })
            }
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="Computer Application">Computer Application</option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Business Administration">
              Business Administration
            </option>
          </select>
          <select
            value={timetableForm.day}
            onChange={(e) =>
              setTimetableForm({ ...timetableForm, day: e.target.value })
            }
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
          <input
            type="text"
            placeholder="Time (e.g. 9:00-10:30)"
            value={timetableForm.time}
            onChange={(e) =>
              setTimetableForm({ ...timetableForm, time: e.target.value })
            }
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              flex: "1",
            }}
            required
          />
          <input
            type="text"
            placeholder="Room (e.g. A-101)"
            value={timetableForm.room}
            onChange={(e) =>
              setTimetableForm({ ...timetableForm, room: e.target.value })
            }
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              flex: "1",
            }}
            required
          />
          <select
            value={timetableForm.type}
            onChange={(e) =>
              setTimetableForm({ ...timetableForm, type: e.target.value })
            }
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
            required
          >
            <option value="Lecture">Lecture</option>
            <option value="Practical">Practical</option>
            <option value="Tutorial">Tutorial</option>
          </select>
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "var(--primary-color)",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add Class
          </button>
        </form>
      </div>

      <div className="academic-card">
        <div className="academic-card-header">
          <span>🗓️ Weekly Schedule</span>
          <span className="badge purple">Active</span>
        </div>
        <table className="acad-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Day</th>
              <th>Time</th>
              <th>Subject</th>
              <th>Room</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {timetableData.length > 0 ? (
              timetableData.map((t, i) => (
                <tr key={i}>
                  <td>{t.course}</td>
                  <td>{t.day}</td>
                  <td>{t.time}</td>
                  <td>{t.subject}</td>
                  <td>{t.room}</td>
                  <td>
                    <span className="grade-badge">{t.type}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No classes scheduled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAttendance = () => {
    const isSunday = new Date(attendanceDate).getDay() === 0;
    return (
      <div className="section-content">
        <div className="section-hero general-hero">
          <div className="section-hero-icon">✅</div>
          <div>
            <h2 className="section-hero-title">Mark Attendance</h2>
            <div
              className="section-hero-sub"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <span>Subject: {teacherData?.subject}</span>
              <span>|</span>
              <span>Select Date:</span>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.1)",
                  outline: "none",
                  background: "rgba(255,255,255,0.8)",
                  color: "var(--text-main)",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              />
            </div>
          </div>
        </div>

        <div className="academic-card">
          <div className="academic-card-header">
            <span>👥 Student List</span>
            <button
              onClick={submitAttendance}
              disabled={isSunday}
              style={{
                background: isSunday ? "#94a3b8" : "var(--primary-color)",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "8px",
                fontWeight: "600",
                cursor: isSunday ? "not-allowed" : "pointer",
              }}
            >
              Save Attendance
            </button>
          </div>

          {isSunday ? (
            <div style={{ padding: "40px 20px", textAlign: "center" }}>
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>🏖️</div>
              <h3 style={{ margin: 0, color: "var(--text-main)" }}>
                Sunday is an Off-Day
              </h3>
              <p style={{ marginTop: "8px", color: "var(--text-muted)" }}>
                Attendance cannot be marked on Sundays.
              </p>
            </div>
          ) : loadingStudents ? (
            <p
              style={{
                padding: "20px",
                textAlign: "center",
                color: "var(--text-muted)",
              }}
            >
              Loading students...
            </p>
          ) : (
            <table className="acad-table">
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.roll_no || s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>{s.course}</td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() =>
                            handleAttendanceChange(s.id, "Present")
                          }
                          style={{
                            background:
                              attendanceData[s.id] === "Present"
                                ? "#10b981"
                                : "rgba(0,0,0,0.05)",
                            color:
                              attendanceData[s.id] === "Present"
                                ? "white"
                                : "var(--text-muted)",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          P
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(s.id, "Absent")}
                          style={{
                            background:
                              attendanceData[s.id] === "Absent"
                                ? "#ef4444"
                                : "rgba(0,0,0,0.05)",
                            color:
                              attendanceData[s.id] === "Absent"
                                ? "white"
                                : "var(--text-muted)",
                            border: "none",
                            padding: "6px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          A
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "timetable":
        return renderTimetable();
      case "attendance":
        return renderAttendance();
      default:
        return renderDashboard();
    }
  };

  if (!teacherData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="sd-root">
      {/* ── TOP HEADER ── */}
      <header className="sd-header">
        <div className="sd-header-left">
          <button
            className="sd-menu-btn"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            ☰
          </button>
          <div className="sd-logo-box">👨‍🏫</div>
          <div>
            <h1 className="sd-college-name">MITRA</h1>
            <p className="sd-college-sub">Teacher Portal</p>
          </div>
        </div>
        <div className="sd-header-right">
          <div className="sd-notif">
            🔔<span className="notif-dot"></span>
          </div>
          <div className="sd-user-wrap">
            <div className="sd-avatar">{teacherData.name.charAt(0)}</div>
            <div>
              <p className="sd-user-name">{teacherData.name}</p>
              <p className="sd-user-roll">{teacherData.department}</p>
            </div>
          </div>
          <button
            className="sd-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="sd-body">
        {/* ── SIDEBAR ── */}
        <aside className={`sd-sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <div className="sd-sidebar-inner">
            <p className="sd-sidebar-label">MAIN MENU</p>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`sd-nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => setActiveSection(item.id)}
              >
                <span className="sd-nav-icon">{item.icon}</span>
                {sidebarOpen && (
                  <span className="sd-nav-label">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          {sidebarOpen && (
            <div className="sd-sidebar-footer">
              <div className="sd-student-mini-card">
                <div className="sd-mini-avatar">
                  {teacherData.name.charAt(0)}
                </div>
                <div>
                  <p className="sd-mini-name">{teacherData.name}</p>
                  <p className="sd-mini-dept">{teacherData.employeeId}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="sd-main">
          <div className="sd-breadcrumb">
            <span>Home</span>
            <span className="sd-bc-sep">›</span>
            <span className="sd-bc-active">
              {navItems.find((n) => n.id === activeSection)?.label}
            </span>
          </div>

          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Teacher;
