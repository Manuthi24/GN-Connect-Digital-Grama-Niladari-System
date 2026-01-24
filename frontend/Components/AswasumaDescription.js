import React from 'react';
import './AswasumaDescription.css';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer/Footer';
import aswasumaLogo from '../assets/aswasuma/aswasuma.png';

function AswasumaDescription() {
  const navigate = useNavigate();
  return (
    <div className="dashboard-background">
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #fbeee6 100%)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <div className="aswasuma-desc-container">
          <img src={aswasumaLogo} alt="Aswasuma Logo" className="aswasuma-logo" />
          <h1 className="aswasuma-title">Aswasuma Welfare Program</h1>
          <div className="aswasuma-highlight-box">
            <p className="aswasuma-desc">
              <b>Empowering Communities, Reducing Poverty, Ensuring Social Security.</b>
            </p>
          </div>
          <section className="aswasuma-section">
            <h2>What is Aswasuma?</h2>
            <p>
              The Aswasuma Welfare Program provides financial and social support to eligible families and individuals in need. The program aims to uplift communities, reduce poverty, and ensure social security for all citizens. Applicants can apply for new welfare benefits or renew their existing status through a simple and transparent process.
            </p>
          </section>
          <section className="aswasuma-section">
            <h2>Get Started</h2>
            <p>Choose an option below to continue:</p>
            <div className="aswasuma-actions">
              <button className="aswasuma-btn" onClick={() => navigate('/apply-welfare')}>Apply for Welfare</button>
              <button className="aswasuma-btn" onClick={() => navigate('/view-welfare')}>View Welfare Details</button>
              <button className="aswasuma-btn" onClick={() => navigate('/appeal-objection')}>Apply for Appeal & Objection</button>
            </div>
          </section>
        </div>
      </div>
      <Footer />
      </div>
    </div>
  );
}

export default AswasumaDescription;
