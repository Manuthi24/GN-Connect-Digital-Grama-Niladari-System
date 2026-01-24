import React from "react"; 
import './nav.css';
import { NavLink } from "react-router-dom";


function Nav() {
  const navLinks = [
    { name: "FAMILY MANAGEMENT", path: "/family-management" },
    { name: "GN DOCUMENT", path: "/issuing-of-certificates" },
    { name: "VOTER ENROLLMENT", path: "/voter-enrollment" },
    { name: "LAND AND PROPERTY", path: "/land-property" },
    { name: "ASWASUMA", path: "/aswasuma" },
    { name: "ADMIN", path: "/GN-Home" }
  ];

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <NavLink to="/" className="logo-container">
        <div className="logo-icon">GN</div>
        <div className="logo-text">GN Connect</div>
      </NavLink>

      {/* Navigation Links */}
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Right Side Icons */}
      <div className="nav-icons">
        <button className="icon-btn" title="Search">
          <span role="img" aria-label="search">🔍</span>
        </button>
        <button className="icon-btn" title="User">
          <span role="img" aria-label="user">🧑</span>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
