import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const TeacherSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    employeeId: "",
    department: "",
    subject: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => {
      const newData = { ...prev, [e.target.name]: e.target.value };

      // Auto-generate official email ID based on Name and Employee ID
      if (e.target.name === "name" || e.target.name === "employeeId") {
        const firstName = newData.name
          ? newData.name
              .split(" ")[0]
              .toLowerCase()
              .replace(/[^a-z0-9]/g, "")
          : "teacher";
        const id = newData.employeeId
          ? newData.employeeId.toLowerCase().replace(/[^a-z0-9]/g, "")
          : "";
        if (firstName && id) {
          newData.email = `${firstName}.${id}@mitra.edu`;
        } else {
          newData.email = "";
        }
      }
      return newData;
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://192.168.1.16:8080/api/teacher/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // Save data to localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", "teacher");
        localStorage.setItem("user", JSON.stringify(data.teacher));

        // Redirect to Teacher Dashboard
        navigate("/teacher");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#eeeeee",
        padding: "20px 0",
      }}
    >
      <div
        style={{
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          width: "350px",
        }}
      >
        <h2
          style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}
        >
          Teacher Signup
        </h2>
        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Official Email (Auto-generated)"
            value={formData.email}
            readOnly
            style={{
              ...inputStyle,
              backgroundColor: "#e9ecef",
              cursor: "not-allowed",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="employeeId"
            placeholder="Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#6f8fc3",
              color: "white",
              border: "none",
              borderRadius: "35px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "10px",
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            to="/teacher-login"
            style={{
              color: "#6f8fc3",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default TeacherSignup;
