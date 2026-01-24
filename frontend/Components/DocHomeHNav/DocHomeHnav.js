import React from "react";


import { Link } from "react-router-dom";

function DocHomeHnav() {
  return (
    <div className="navbar">
        
      {/* Logo Section */}
      <Link to="/" className="logo-container">
        <div className="logo-icon">
          GN
        </div>
        <div className="logo-text">GN Office</div>
      </Link>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/" className="active home-a">
            <h1>Home</h1>
          </Link>
        </li>

        <li>
          <Link to="/apply-welfare" className="home-a">
            <h1>Apply Welfare</h1>
          </Link>
        </li>

        <li>
          <Link to="/view-welfare" className="home-a">
            <h1>View Welfare Details</h1>
          </Link>
        </li>

        <li>
          <Link to="/issuing-certificate" className="home-a">
            <h1>Issuing Certificate</h1>
          </Link>
        </li>
        <li>
          <Link to="/add-document" className="home-a">
            <h1>Add New Document</h1>
          </Link>
        </li>
        <li>
          <Link to="/document-details" className="home-a">
            <h1>Document Details</h1>
          </Link>
        </li>
      </ul>

      {/* Search Box */}
      <div className="search-box">
        <input type="text" placeholder="Search documents..." />
        <button>
          🔍 Search
        </button>
      </div>
    </div>
  );
}

export default DocHomeHnav;