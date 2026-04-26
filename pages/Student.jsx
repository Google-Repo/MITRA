import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/StudentDashboard.css";

const Student = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("academic");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setStudentData(JSON.parse(user));
      } catch (error) {
        navigate("/student-login");
      }
    } else {
      navigate("/student-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { id: "fees", icon: "💳", label: "Fees Information" },
    { id: "general", icon: "📋", label: "General Information" },
    { id: "academic", icon: "🎓", label: "Academic Section" },
    { id: "hostel", icon: "🏠", label: "Hostel Information" },
    { id: "transport", icon: "🚌", label: "Transportation" },
    { id: "library", icon: "📚", label: "Library Section" },
  ];

  /* ─────────── SECTION RENDERERS ─────────── */

  const renderFees = () => (
    <div className="section-content">
      <div className="section-hero fees-hero">
        <div className="section-hero-icon">💳</div>
        <div>
          <h2 className="section-hero-title">Fees Information</h2>
          <p className="section-hero-sub">
            Manage all your fee-related activities here
          </p>
        </div>
      </div>

      <div className="info-cards-grid">
        {[
          {
            icon: "💰",
            title: "Pay Fees Online",
            desc: "Pay your semester & miscellaneous fees securely online.",
            tag: "Due: ₹12,500",
            tagColor: "#ef4444",
            btn: "Pay Now",
            btnColor: "#6366f1",
          },
          {
            icon: "🧾",
            title: "Fees Receipts",
            desc: "Download official fee receipts for paid transactions.",
            tag: "Last: Mar 2026",
            tagColor: "#10b981",
            btn: "Download",
            btnColor: "#10b981",
          },
          {
            icon: "📒",
            title: "Student Ledger",
            desc: "View your complete fee ledger and payment history.",
            tag: "3 Entries",
            tagColor: "#f59e0b",
            btn: "View Ledger",
            btnColor: "#f59e0b",
          },
          {
            icon: "🔄",
            title: "Online Fee Transaction Status",
            desc: "Track the status of your online fee transactions.",
            tag: "Verified",
            tagColor: "#10b981",
            btn: "Check Status",
            btnColor: "#6366f1",
          },
          {
            icon: "✅",
            title: "Verified Transaction Status",
            desc: "Check if your transaction has been verified by the admin.",
            tag: "2 Pending",
            tagColor: "#ef4444",
            btn: "View Status",
            btnColor: "#0ea5e9",
          },
        ].map((item, i) => (
          <div className="info-card" key={i}>
            <div className="info-card-icon">{item.icon}</div>
            <div className="info-card-body">
              <h4 className="info-card-title">{item.title}</h4>
              <p className="info-card-desc">{item.desc}</p>
              <span
                className="info-card-tag"
                style={{
                  background: item.tagColor + "22",
                  color: item.tagColor,
                }}
              >
                {item.tag}
              </span>
            </div>
            <button
              className="info-card-btn"
              style={{ background: item.btnColor }}
            >
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGeneral = () => (
    <div className="section-content">
      <div className="section-hero general-hero">
        <div className="section-hero-icon">📋</div>
        <div>
          <h2 className="section-hero-title">General Information</h2>
          <p className="section-hero-sub">
            Access your profile, notices, forms and more
          </p>
        </div>
      </div>

      <div className="info-cards-grid">
        {[
          {
            icon: "👤",
            title: "Your Profile",
            desc: "View and manage your personal academic profile.",
            tag: "Updated",
            tagColor: "#10b981",
            btn: "View Profile",
            btnColor: "#6366f1",
          },
          {
            icon: "📄",
            title: "Question Papers",
            desc: "Access previous year question papers for exam prep.",
            tag: "12 Papers",
            tagColor: "#6366f1",
            btn: "Browse",
            btnColor: "#6366f1",
          },
          {
            icon: "📢",
            title: "News / Notices",
            desc: "Stay updated with latest college news and notices.",
            tag: "5 New",
            tagColor: "#ef4444",
            btn: "Read Now",
            btnColor: "#f59e0b",
          },
          {
            icon: "📖",
            title: "Syllabus",
            desc: "Download the current semester syllabus for all subjects.",
            tag: "Sem 4",
            tagColor: "#0ea5e9",
            btn: "Download",
            btnColor: "#0ea5e9",
          },
          {
            icon: "📁",
            title: "Study Material",
            desc: "Access notes and study material shared by teachers.",
            tag: "28 Files",
            tagColor: "#6366f1",
            btn: "Open",
            btnColor: "#6366f1",
          },
          {
            icon: "✍️",
            title: "Grievance Submission",
            desc: "Submit and track your academic or campus grievances.",
            tag: "New",
            tagColor: "#ef4444",
            btn: "Submit",
            btnColor: "#ef4444",
          },
          {
            icon: "📝",
            title: "Online Form Approval",
            desc: "Check the approval status of any submitted online form.",
            tag: "Pending",
            tagColor: "#f59e0b",
            btn: "Track",
            btnColor: "#f59e0b",
          },
          {
            icon: "📞",
            title: "Contact Details Update",
            desc: "Update your phone number, email and address.",
            tag: "Last: Jan 26",
            tagColor: "#718096",
            btn: "Update",
            btnColor: "#0ea5e9",
          },
          {
            icon: "🛠️",
            title: "Other Service Requests",
            desc: "Raise service requests for various academic needs.",
            tag: "1 Open",
            tagColor: "#f59e0b",
            btn: "Raise Request",
            btnColor: "#6366f1",
          },
          {
            icon: "🆔",
            title: "ABC ID Verification",
            desc: "Verify your Academic Bank of Credits ID status.",
            tag: "Verified",
            tagColor: "#10b981",
            btn: "Check",
            btnColor: "#10b981",
          },
        ].map((item, i) => (
          <div className="info-card" key={i}>
            <div className="info-card-icon">{item.icon}</div>
            <div className="info-card-body">
              <h4 className="info-card-title">{item.title}</h4>
              <p className="info-card-desc">{item.desc}</p>
              <span
                className="info-card-tag"
                style={{
                  background: item.tagColor + "22",
                  color: item.tagColor,
                }}
              >
                {item.tag}
              </span>
            </div>
            <button
              className="info-card-btn"
              style={{ background: item.btnColor }}
            >
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAcademic = () => (
    <div className="section-content">
      <div className="section-hero academic-hero">
        <div className="section-hero-icon">🎓</div>
        <div>
          <h2 className="section-hero-title">Academic Section</h2>
          <p className="section-hero-sub">
            Your timetable, marks, exams and attendance at a glance
          </p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="academic-stats-row">
        {[
          { label: "Attendance", value: "83.7%", color: "#10b981", icon: "✅" },
          {
            label: "Internal Marks",
            value: "78 / 100",
            color: "#6366f1",
            icon: "📊",
          },
          {
            label: "Backlog Subjects",
            value: "0",
            color: "#22c55e",
            icon: "📗",
          },
          {
            label: "Assignments Due",
            value: "3",
            color: "#f59e0b",
            icon: "📌",
          },
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

      <div className="academic-grid">
        {/* Time Table */}
        <div className="academic-card">
          <div className="academic-card-header">
            <span>🗓️ Time Table</span>
            <span className="badge blue">Sem 4</span>
          </div>
          <table className="acad-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject</th>
                <th>Time</th>
                <th>Room</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Monday", "Data Structures", "9:00–10:30", "A-101"],
                ["Tuesday", "Operating Systems", "10:30–12:00", "B-202"],
                ["Wednesday", "DBMS", "9:00–10:30", "A-105"],
                ["Thursday", "CN Networks", "11:00–12:30", "C-301"],
                ["Friday", "Software Eng.", "9:00–10:30", "A-101"],
              ].map(([d, s, t, r], i) => (
                <tr key={i}>
                  <td>{d}</td>
                  <td>{s}</td>
                  <td>{t}</td>
                  <td>{r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Internal Assessment Marks */}
        <div className="academic-card">
          <div className="academic-card-header">
            <span>📊 Internal Assessment Marks</span>
            <span className="badge purple">Sem 4</span>
          </div>
          <div className="marks-list">
            {[
              ["Data Structures", 82, 100],
              ["Operating Systems", 75, 100],
              ["DBMS", 90, 100],
              ["CN Networks", 68, 100],
              ["Software Eng.", 85, 100],
            ].map(([sub, got, total], i) => (
              <div className="marks-row" key={i}>
                <span className="marks-sub">{sub}</span>
                <div className="marks-bar-track">
                  <div
                    className="marks-bar-fill"
                    style={{
                      width: `${(got / total) * 100}%`,
                      background: got >= 75 ? "#6366f1" : "#ef4444",
                    }}
                  ></div>
                </div>
                <span
                  className="marks-score"
                  style={{ color: got >= 75 ? "#10b981" : "#ef4444" }}
                >
                  {got}/{total}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Exam Result */}
        <div className="academic-card">
          <div className="academic-card-header">
            <span>🏆 Exam Result</span>
            <span className="badge green">Sem 3 Declared</span>
          </div>
          <table className="acad-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Mathematics", 88, "A", "Pass"],
                ["Physics", 74, "B", "Pass"],
                ["Chemistry", 91, "A+", "Pass"],
                ["English", 65, "C", "Pass"],
                ["Comp. Science", 95, "O", "Pass"],
              ].map(([sub, m, g, st], i) => (
                <tr key={i}>
                  <td>{sub}</td>
                  <td>{m}</td>
                  <td>
                    <span className="grade-badge">{g}</span>
                  </td>
                  <td>
                    <span className="status-pass">{st}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Backlog Subjects */}
        <div className="academic-card">
          <div className="academic-card-header">
            <span>📗 Current Backlog Subjects</span>
            <span className="badge green">All Clear</span>
          </div>
          <div className="empty-state">
            <div className="empty-icon">🎉</div>
            <p>No backlog subjects! You're on track.</p>
          </div>
        </div>

        {/* Assignments */}
        <div className="academic-card">
          <div className="academic-card-header">
            <span>📌 Assignments</span>
            <span className="badge orange">3 Pending</span>
          </div>
          <div className="assignment-list">
            {[
              {
                sub: "Data Structures",
                title: "Binary Tree Implementation",
                due: "Apr 30",
                status: "Pending",
              },
              {
                sub: "DBMS",
                title: "ER Diagram for Library",
                due: "May 2",
                status: "Submitted",
              },
              {
                sub: "Software Eng.",
                title: "SRS Document Preparation",
                due: "May 5",
                status: "Pending",
              },
              {
                sub: "CN Networks",
                title: "Subnetting Exercises",
                due: "May 8",
                status: "Pending",
              },
            ].map((a, i) => (
              <div className="assignment-row" key={i}>
                <div className="assignment-info">
                  <span className="assignment-sub">{a.sub}</span>
                  <span className="assignment-title">{a.title}</span>
                  <span className="assignment-due">📅 Due: {a.due}</span>
                </div>
                <span
                  className={`assign-status ${a.status === "Submitted" ? "submitted" : "pending"}`}
                >
                  {a.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Status */}
        <div className="academic-card">
          <div className="academic-card-header">
            <span>✅ Attendance Status</span>
            <span className="badge blue">Sem 4</span>
          </div>
          <div className="attendance-list">
            {[
              ["Data Structures", 38, 45],
              ["Operating Systems", 32, 40],
              ["DBMS", 40, 42],
              ["CN Networks", 28, 38],
              ["Software Eng.", 35, 40],
            ].map(([sub, att, total], i) => {
              const pct = Math.round((att / total) * 100);
              return (
                <div className="att-row" key={i}>
                  <span className="att-sub">{sub}</span>
                  <div className="att-bar-track">
                    <div
                      className="att-bar-fill"
                      style={{
                        width: `${pct}%`,
                        background: pct >= 75 ? "#10b981" : "#ef4444",
                      }}
                    ></div>
                  </div>
                  <span
                    className="att-pct"
                    style={{ color: pct >= 75 ? "#10b981" : "#ef4444" }}
                  >
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHostel = () => (
    <div className="section-content">
      <div className="section-hero hostel-hero">
        <div className="section-hero-icon">🏠</div>
        <div>
          <h2 className="section-hero-title">Hostel Information</h2>
          <p className="section-hero-sub">
            Room details, fees, notices and complaints
          </p>
        </div>
      </div>

      <div className="hostel-overview">
        <div className="hostel-room-card">
          <div className="hostel-room-icon">🏠</div>
          <div>
            <h3 className="hostel-room-num">Room 204-B</h3>
            <p className="hostel-room-block">Block C · Boys Hostel</p>
          </div>
          <div className="hostel-room-meta">
            <span>Capacity: 2</span>
            <span>Floor: 2nd</span>
          </div>
        </div>
      </div>

      <div className="info-cards-grid">
        {[
          {
            icon: "🛏️",
            title: "Hostel Room Details",
            desc: "Room No: 204-B, Block C, 2nd Floor, Double Occupancy.",
            tag: "Allotted",
            tagColor: "#10b981",
            btn: "View Details",
            btnColor: "#6366f1",
          },
          {
            icon: "💳",
            title: "Hostel Fee Status",
            desc: "Hostel fee for the current semester.",
            tag: "Paid ✓",
            tagColor: "#10b981",
            btn: "Download Receipt",
            btnColor: "#10b981",
          },
          {
            icon: "📢",
            title: "Hostel Notices",
            desc: "Latest hostel warden notices and announcements.",
            tag: "2 New",
            tagColor: "#ef4444",
            btn: "Read",
            btnColor: "#f59e0b",
          },
          {
            icon: "🔧",
            title: "Complaint Registration",
            desc: "Register maintenance or other hostel complaints.",
            tag: "1 Open",
            tagColor: "#f59e0b",
            btn: "Register",
            btnColor: "#ef4444",
          },
        ].map((item, i) => (
          <div className="info-card" key={i}>
            <div className="info-card-icon">{item.icon}</div>
            <div className="info-card-body">
              <h4 className="info-card-title">{item.title}</h4>
              <p className="info-card-desc">{item.desc}</p>
              <span
                className="info-card-tag"
                style={{
                  background: item.tagColor + "22",
                  color: item.tagColor,
                }}
              >
                {item.tag}
              </span>
            </div>
            <button
              className="info-card-btn"
              style={{ background: item.btnColor }}
            >
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTransport = () => (
    <div className="section-content">
      <div className="section-hero transport-hero">
        <div className="section-hero-icon">🚌</div>
        <div>
          <h2 className="section-hero-title">Transportation</h2>
          <p className="section-hero-sub">
            Bus routes, stops, fees and notices
          </p>
        </div>
      </div>

      <div className="transport-banner">
        <div className="transport-bus-icon">🚌</div>
        <div>
          <h3>Route 7 — Nashik Phata → MITRA Campus</h3>
          <p>
            Bus No: MH-12-AB-4567 &nbsp;|&nbsp; Departure: 8:00 AM &nbsp;|&nbsp;
            Return: 5:30 PM
          </p>
        </div>
        <span className="transport-status active">Active</span>
      </div>

      <div className="info-cards-grid">
        {[
          {
            icon: "🗺️",
            title: "Bus Route Details",
            desc: "Your assigned bus route: Nashik Phata → Wakad → MITRA Campus.",
            tag: "Route 7",
            tagColor: "#6366f1",
            btn: "View Route",
            btnColor: "#6366f1",
          },
          {
            icon: "📍",
            title: "Bus Stops Information",
            desc: "Pick-up stop: Wakad Chowk at 8:15 AM. Drop-off: Campus Gate.",
            tag: "Wakad Stop",
            tagColor: "#0ea5e9",
            btn: "View Stops",
            btnColor: "#0ea5e9",
          },
          {
            icon: "💳",
            title: "Transport Fee Status",
            desc: "Annual transport fee for current academic year.",
            tag: "Paid ✓",
            tagColor: "#10b981",
            btn: "Receipt",
            btnColor: "#10b981",
          },
          {
            icon: "📢",
            title: "Transport Notices",
            desc: "Latest transport department notices and schedule changes.",
            tag: "1 New",
            tagColor: "#f59e0b",
            btn: "Read",
            btnColor: "#f59e0b",
          },
        ].map((item, i) => (
          <div className="info-card" key={i}>
            <div className="info-card-icon">{item.icon}</div>
            <div className="info-card-body">
              <h4 className="info-card-title">{item.title}</h4>
              <p className="info-card-desc">{item.desc}</p>
              <span
                className="info-card-tag"
                style={{
                  background: item.tagColor + "22",
                  color: item.tagColor,
                }}
              >
                {item.tag}
              </span>
            </div>
            <button
              className="info-card-btn"
              style={{ background: item.btnColor }}
            >
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="section-content">
      <div className="section-hero library-hero">
        <div className="section-hero-icon">📚</div>
        <div>
          <h2 className="section-hero-title">Library Section</h2>
          <p className="section-hero-sub">
            Search books, check issued books, return dates and fines
          </p>
        </div>
      </div>

      {/* OPAC Search Bar */}
      <div className="library-search-bar">
        <span className="library-search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search books by title, author or ISBN (OPAC)..."
          className="library-search-input"
        />
        <button className="library-search-btn">Search</button>
      </div>

      {/* Issued Books Table */}
      <div className="academic-card" style={{ marginBottom: "24px" }}>
        <div className="academic-card-header">
          <span>📖 Issued Books Details</span>
          <span className="badge blue">2 Issued</span>
        </div>
        <table className="acad-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Operating System Concepts",
                "Silberschatz",
                "Apr 10, 2026",
                "Apr 25, 2026",
                "Overdue",
              ],
              [
                "DBMS Fundamentals",
                "Ramez Elmasri",
                "Apr 15, 2026",
                "Apr 30, 2026",
                "Issued",
              ],
            ].map(([b, a, id, rd, st], i) => (
              <tr key={i}>
                <td>{b}</td>
                <td>{a}</td>
                <td>{id}</td>
                <td>{rd}</td>
                <td>
                  <span
                    className={`status-badge ${st === "Overdue" ? "overdue" : "active-badge"}`}
                  >
                    {st}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="info-cards-grid">
        {[
          {
            icon: "📚",
            title: "OPAC – Search Books",
            desc: "Search the online catalogue by title, author or ISBN.",
            tag: "10,000+ Books",
            tagColor: "#6366f1",
            btn: "Search",
            btnColor: "#6366f1",
          },
          {
            icon: "📖",
            title: "Issued Books Details",
            desc: "View list of currently issued books and due dates.",
            tag: "2 Issued",
            tagColor: "#0ea5e9",
            btn: "View All",
            btnColor: "#0ea5e9",
          },
          {
            icon: "📅",
            title: "Return Date Status",
            desc: "Check the return deadline for all your borrowed books.",
            tag: "1 Overdue!",
            tagColor: "#ef4444",
            btn: "View Dates",
            btnColor: "#ef4444",
          },
          {
            icon: "⚠️",
            title: "Fine Status",
            desc: 'Overdue fine for "OS Concepts": ₹5/day × 1 day = ₹5.',
            tag: "₹5 Fine",
            tagColor: "#f59e0b",
            btn: "Pay Fine",
            btnColor: "#f59e0b",
          },
          {
            icon: "📢",
            title: "Library Notices",
            desc: "Latest notices from Library department.",
            tag: "3 New",
            tagColor: "#6366f1",
            btn: "Read",
            btnColor: "#6366f1",
          },
        ].map((item, i) => (
          <div className="info-card" key={i}>
            <div className="info-card-icon">{item.icon}</div>
            <div className="info-card-body">
              <h4 className="info-card-title">{item.title}</h4>
              <p className="info-card-desc">{item.desc}</p>
              <span
                className="info-card-tag"
                style={{
                  background: item.tagColor + "22",
                  color: item.tagColor,
                }}
              >
                {item.tag}
              </span>
            </div>
            <button
              className="info-card-btn"
              style={{ background: item.btnColor }}
            >
              {item.btn}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "fees":
        return renderFees();
      case "general":
        return renderGeneral();
      case "academic":
        return renderAcademic();
      case "hostel":
        return renderHostel();
      case "transport":
        return renderTransport();
      case "library":
        return renderLibrary();
      default:
        return renderAcademic();
    }
  };

  if (!studentData) {
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

  /* ─────────── JSX ─────────── */
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
          <div className="sd-logo-box">🎓</div>
          <div>
            <h1 className="sd-college-name">MITRA</h1>
            <p className="sd-college-sub">Student Portal</p>
          </div>
        </div>
        <div className="sd-header-right">
          <div className="sd-notif">
            🔔<span className="notif-dot"></span>
          </div>
          <div className="sd-user-wrap">
            <div className="sd-avatar">
              {studentData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="sd-user-name">{studentData.name}</p>
              <p className="sd-user-roll">Roll No: {studentData.rollNo}</p>
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
                  {studentData.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="sd-mini-name">{studentData.name}</p>
                  <p className="sd-mini-dept">{studentData.course}</p>
                </div>
              </div>
            </div>
          )}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="sd-main">
          {/* Breadcrumb */}
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

export default Student;
