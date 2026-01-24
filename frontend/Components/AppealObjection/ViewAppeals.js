import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Footer/Footer';
import './AppealObjection.css';
import { useNavigate } from 'react-router-dom';

function ViewAppeals() {
  const [appeals, setAppeals] = useState([]);
  const [searchNIC, setSearchNIC] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/appeals')
      .then(res => {
        // Sort by createdAt ascending (oldest first)
        const sorted = (res.data.appeals || []).slice().sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setAppeals(sorted);
      })
      .catch(() => setAppeals([]));
  }, []);

  // Filter by NIC if searching
  const filteredAppeals = searchNIC.trim()
    ? appeals.filter(a => a.nic && a.nic.toLowerCase().includes(searchNIC.trim().toLowerCase()))
    : appeals;

  return (
    <div className="appeal-objection-page">
      <div className="appeal-objection-container">
        <button
          type="button"
          className="back-btn-modern"
          onClick={() => navigate('/aswasuma')}
          aria-label="Back to Aswasuma Description"
          style={{ margin: '0 0 18px 0' }}
        >
          <span style={{ display: 'inline-block', transform: 'translateY(1px)', marginRight: 8 }}>&larr;</span>
          <span style={{ fontWeight: 600, letterSpacing: 1 }}>BACK</span>
        </button>
        <h1>All Appeals & Objections</h1>
        <button className="appeal-btn" style={{marginBottom: 18}} onClick={() => navigate('/appeal-objection')}>+ New Appeal/Objection</button>
        <input
          type="text"
          placeholder="Search by NIC..."
          value={searchNIC}
          onChange={e => setSearchNIC(e.target.value)}
          className="nic-search-input"
          style={{marginBottom: 18, width: '100%', padding: 10, borderRadius: 8, border: '1.5px solid #e6e6e6'}}
        />
        {filteredAppeals.length === 0 ? (
          <div className="no-appeals-msg">No appeals or objections found.</div>
        ) : (
          <div className="appeal-list-grid">
            {filteredAppeals.map((a, idx) => {
              const isAppeal = a.type && a.type.toLowerCase() === 'appeal';
              return (
                <div
                  key={a._id}
                  className="appeal-card-modern clickable-card"
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for Appeal & Objection ${idx + 1}`}
                  onClick={() => navigate(`/appeal/${a._id}`)}
                  onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') navigate(`/appeal/${a._id}`); }}
                >
                  <div className="appeal-card-header">
                    <span className={`appeal-badge ${isAppeal ? 'appeal-badge-appeal' : 'appeal-badge-objection'}`}>{isAppeal ? 'A' : 'O'}</span>
                    <span className="appeal-card-title">Appeal & Objection {idx + 1}</span>
                  </div>
                  <div className="appeal-card-body">
                    <div className="appeal-summary-row">
                      <span><b>Name:</b> {a.applicantName}</span>
                      <span className="appeal-type-label">{a.type}</span>
                    </div>
                    <div className="appeal-summary-row">
                      <span><b>NIC:</b> {a.nic}</span>
                      <span><b>Contact:</b> {a.contactNumber}</span>
                    </div>
                    <div className="appeal-summary-row">
                      <span><b>Address:</b> {a.address}</span>
                    </div>
                    <div className="appeal-summary-row">
                      <span><b>Date:</b> {a.date ? a.date.slice(0,10) : ''}</span>
                    </div>
                    <div className="appeal-summary-row">
                      <span><b>Reason:</b> {a.reason}</span>
                    </div>
                    {a.supportingDocs && (
                      <div className="appeal-summary-row">
                        <span><b>Supporting Docs:</b> {a.supportingDocs}</span>
                      </div>
                    )}
                  </div>
                  <div className="appeal-card-actions">
                    <button
                      className="appeal-btn primary-btn"
                      onClick={e => { e.stopPropagation(); navigate(`/appeal/${a._id}`); }}
                      tabIndex={-1}
                    >
                      View / Edit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default ViewAppeals;
