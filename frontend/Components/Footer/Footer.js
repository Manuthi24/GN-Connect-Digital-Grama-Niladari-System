import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram 
} from "@fortawesome/free-brands-svg-icons";
import { 
  faPhone, 
  faEnvelope, 
  faMapMarkerAlt, 
  faQuestionCircle 
} from "@fortawesome/free-solid-svg-icons";

// Use require to ensure React resolves the image correctly
const logo = require("../../assets/HomeImages/HomeImages/logo.png");

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Quick Links */}
        <div className="footer-section">
          <h4>eGN Services</h4>
          <ul>
            <li><Link to="/character-certificate" className="footer-link">Character Certificate</Link></li>
            <li><Link to="/birth-death-report" className="footer-link">Birth & Death Reporting</Link></li>
            <li><Link to="/id-certification" className="footer-link">ID Card Certification</Link></li>
            <li><Link to="/peace-officer" className="footer-link">Peace Officer Services</Link></li>
            <li><Link to="/residence-proof" className="footer-link">Proof of Residence</Link></li>
            <li><Link to="/election-duties" className="footer-link">Election Duties</Link></li>
            <li><Link to="/land-certification" className="footer-link">Land Certification</Link></li>
            <li><Link to="/view-welfare" className="footer-link">Welfare Facilitation</Link></li>
            <li><Link to="/disaster-response" className="footer-link">Disaster Response</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li><FontAwesomeIcon icon={faPhone} /> +94 11 2XXX XXX</li>
            <li><FontAwesomeIcon icon={faEnvelope} /> info@egn.gov.lk</li>
            <li><FontAwesomeIcon icon={faMapMarkerAlt} /> Grama Niladhari Division, Sri Lanka</li>
            <li>Helpline: 194X (Government Services)</li>
          </ul>
        </div>

        {/* Social & Policies */}
        <div className="footer-section">
          <h4>Connect</h4>
          <ul className="social-links">
            <li><a href="https://www.facebook.com/egnsl" aria-label="Facebook"><FontAwesomeIcon icon={faFacebookF} /></a></li>
            <li><a href="https://twitter.com/egnsl" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a href="https://www.instagram.com/egnsl" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a></li>
          </ul>
          <ul>
            <li><Link to="/privacy" className="footer-link"><FontAwesomeIcon icon={faQuestionCircle} /> Privacy Policy</Link></li>
            <li><Link to="/terms" className="footer-link"><FontAwesomeIcon icon={faQuestionCircle} /> Terms of Use</Link></li>
            <li><Link to="/help" className="footer-link"><FontAwesomeIcon icon={faQuestionCircle} /> Help</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Section with Logo */}
      <div className="footer-bottom">
        <div className="logo-container">
          <img src={logo} alt="Sri Lanka Government Logo" className="gov-logo" />
          <span className="site-name">eGN Connect - Digital Grama Niladhari</span>
        </div>
        <p>&copy; 2025 eGrama Niladhari System. All Rights Reserved. | Developed by Group Project Team</p>
      </div>
    </footer>
  );
}

export default Footer;
