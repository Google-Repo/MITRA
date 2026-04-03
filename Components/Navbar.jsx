import React from "react";
import "../src/Navbar.css";

function Navbar() {
  return (
   <nav className="navbar">
      <div className="logo">
        <img src="MITRA/Images/logo.png"/>
      </div>

      <ul className="nav-links">
        <li><a href="#">HOME</a></li>
        <li><a href="#">STUDENT</a></li>
        <li><a href="#">TEACHER</a></li>
        <li><a href="#">ADMIN</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;