import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../src/StudentDashboard.css"; // Reuse the global dashboard CSS

const Admin = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Fetch Admin data from local storage
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setAdminData(JSON.parse(user));
      } catch (error) {
        console.error("Error parsing admin data", error);
        navigate("/admin-login");
      }
    } else {
      // Redirect to login if not authenticated
      navigate("/admin-login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const navItems = [
    { id: "dashboard", icon: "📊", label: "Admin Overview" },
    { id: "students", icon: "🎓", label: "Manage Students" },
    { id: "teachers", icon: "👨‍🏫", label: "Manage Teachers" },
    { id: "settings", icon: "⚙️", label: "System Settings" },
  ];

  const renderDashboard = () => (
    <div className="section-content">
      <div className="section-hero general-hero">
        <div className="section-hero-icon">🛠️</div>
        <div>
          <h2 className="section-hero-title">Welcome, {adminData?.name}!</h2>
          <p className="section-hero-sub">
            System Administrator • ID: {adminData?.adminId}
          </p>
        </div>
      </div>

      {/* Key System Stats */}
      <div className="academic-stats-row">
        {[
          {
            label: "Total Students",
            value: "1,245",
            color: "#10b981",
            icon: "🎓",
          },
          {
            label: "Total Teachers",
            value: "84",
            color: "#6366f1",
            icon: "👨‍🏫",
          },
          {
            label: "Pending Approvals",
            value: "12",
            color: "#f59e0b",
            icon: "📝",
          },
          { label: "System Alerts", value: "0", color: "#22c55e", icon: "✅" },
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

      {/* Quick Actions */}
      <div className="academic-grid" style={{ marginTop: "24px" }}>
        <div className="academic-card">
          <div className="academic-card-header">
            <span>⚡ Quick Actions</span>
          </div>
          <div
            className="info-cards-grid"
            style={{ gridTemplateColumns: "1fr", gap: "10px" }}
          >
            <button
              className="info-card-btn"
              style={{ background: "#6366f1", padding: "12px", width: "100%" }}
            >
              Add New Teacher
            </button>
            <button
              className="info-card-btn"
              style={{ background: "#10b981", padding: "12px", width: "100%" }}
            >
              Approve Student Forms
            </button>
            <button
              className="info-card-btn"
              style={{ background: "#f59e0b", padding: "12px", width: "100%" }}
            >
              Broadcast Notice
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!adminData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Loading Admin Portal...</h2>
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
          <div className="sd-logo-box">🛠️</div>
          <div>
            <h1 className="sd-college-name">MITRA</h1>
            <p className="sd-college-sub">Admin Portal</p>
          </div>
        </div>
        <div className="sd-header-right">
          <div className="sd-notif">
            🔔<span className="notif-dot"></span>
          </div>
          <div className="sd-user-wrap">
            <div className="sd-avatar">
              {adminData.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="sd-user-name">{adminData.name}</p>
              <p className="sd-user-roll">{adminData.adminId}</p>
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
            <p className="sd-sidebar-label">ADMIN MENU</p>
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

          {/* Currently defaults to rendering dashboard stats */}
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
