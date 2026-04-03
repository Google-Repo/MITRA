import React from "react";
import { Link } from "react-router-dom"; // ✅ IMPORT
import "../Components/Navbar"; // (path fix if needed)
import "../src/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://res.cloudinary.com/dohdiu2s6/image/upload/v1775240145/logo_yup4y5.png"
          width="100px"
          alt="logo"
        />
      </div>

      <ul className="nav-links">
        <li><Link to="/">HOME</Link></li>
        {/* <li><Link to="/student">STUDENT</Link></li>
        <li><Link to="/teacher">TEACHER</Link></li>
        <li><Link to="/admin">ADMIN</Link></li> */}
        <li><Link to="/">LOGIN</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;