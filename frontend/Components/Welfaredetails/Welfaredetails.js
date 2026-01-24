
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Welfare from '../Welfare/Welfare';
import './welfaredetails.css';
import Footer from "../Footer/Footer";

const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Welfaredetails() {
  const [users, setUsers] = React.useState();

  React.useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  // Removed global print logic; handled per user in Welfare component

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const navigate = useNavigate();

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        user.nic && user.nic.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
      setUsers(filteredUsers);
      setNoResults(filteredUsers.length === 0);
    });
  }

  return (
    <div>
      <button
        type="button"
        className="back-btn-modern"
        onClick={() => navigate('/aswasuma')}
        aria-label="Back to Aswasuma Description"
        style={{ margin: '20px 0 10px 0' }}
      >
        <span style={{ display: 'inline-block', transform: 'translateY(1px)', marginRight: 8 }}>&larr;</span>
        <span style={{ fontWeight: 600, letterSpacing: 1 }}>BACK</span>
      </button>
      <h1>Aswasuma Details</h1>
      <div className="search-section">
        <input
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Applicant Details..."
          value={searchQuery}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>
      {noResults ? (
        <div className="no-results">
          <p>No Applicants Found</p>
        </div>
      ) : (
        <div className="users-container">
          {users && users.map((user, i) => (
            <div key={i} className="user-card">
              <Welfare user={user} index={i} />
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Welfaredetails;
