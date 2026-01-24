import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const modules = [
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family Management",
    description: "View and manage your family details, update member information, and handle family-related documentation",
    path: "/family-management"
  },
  {
    icon: "✅",
    title: "Voter Registration",
    description: "Register to vote, update voter information, and manage your electoral participation",
    path: "/voter-enrollment"
  },
  {
    icon: "📄",
    title: "GN Documents",
    description: "Access and request official government documents, certificates, and administrative papers",
    path: "/issuing-of-certificates"
  },
  {
    icon: "🏠",
    title: "Land & Property",
    description: "Manage land ownership records, property documentation, and related legal matters",
    path: "/land-property"
  },
  {
    icon: "🏛️",
    title: "Aswasuma Services",
    description: "Access government welfare programs, benefits, and social services",
    path: "/aswasuma"
  },
  {
    icon: "⚙️",
    title: "GN Administration",
    description: "Administrative tools and services for Grama Niladhari office operations",
    path: "/GN-Home"
  }
];

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <div className="background-image"></div>
      <div className="background-overlay"></div>
      <div className="welcome-card">
        <div className="welcome-title">GN CONNECT</div>
        <div className="welcome-subtitle">Your Gateway to Government Services</div>
        <div className="welcome-description">
          Welcome to the official Government Network portal. Access essential government services, manage your family records, register for voter enrollment, handle land and property documentation, and connect with various government departments – all from one secure, convenient platform.
        </div>
      </div>
      <div className="modules-section">
        <div className="modules-grid">
          {modules.map((mod, idx) => (
            <button className="module-button" key={idx} onClick={() => navigate(mod.path)}>
              <span className="module-icon">{mod.icon}</span>
              <div className="module-title">{mod.title}</div>
              <div className="module-description">{mod.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;