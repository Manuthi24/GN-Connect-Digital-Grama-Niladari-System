import React from 'react';
import './AppealObjection.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import axios from 'axios';

function AppealObjection() {
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
    applicantName: '',
    nic: '',
    contactNumber: '',
    address: '',
    type: '',
    reason: '',
    supportingDocs: '',
    date: '',
  });
  const [errors, setErrors] = React.useState({});

  // Real-time input restrictions
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'nic') {
      let filtered = value.replace(/[^0-9vVxX]/g, '');
      if (/^[0-9]{0,9}$/.test(filtered)) {
        setInputs((prev) => ({ ...prev, [name]: filtered }));
      } else if (/^[0-9]{9}[vVxX]?$/.test(filtered)) {
        setInputs((prev) => ({ ...prev, [name]: filtered.slice(0, 10) }));
      } else if (/^[0-9]{10,12}$/.test(filtered)) {
        setInputs((prev) => ({ ...prev, [name]: filtered.slice(0, 12) }));
      } else {
        setInputs((prev) => ({ ...prev, [name]: filtered.slice(0, 12) }));
      }
      return;
    }
    if (name === 'contactNumber') {
      let filtered = value.replace(/[^0-9]/g, '').slice(0, 10);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === 'applicantName') {
      let filtered = value.replace(/[^a-zA-Z\s]/g, '').slice(0, 100);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === 'address') {
      let filtered = value.replace(/[^a-zA-Z0-9\s,.-]/g, '').slice(0, 200);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === 'reason') {
      let filtered = value.replace(/[^\x20-\x7E]/g, '').slice(0, 300);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === 'supportingDocs') {
      let filtered = value.replace(/[^\x20-\x7E]/g, '').slice(0, 200);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  // Validation similar to welfare forms
  const validate = () => {
    const temp = {};
    if (!inputs.applicantName || !/^[a-zA-Z\s]{3,100}$/.test(inputs.applicantName))
      temp.applicantName = 'Name must be 3-100 letters and spaces only';
    if (!inputs.nic || !/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(inputs.nic))
      temp.nic = 'NIC must be 9 digits + V/X or 12 digits';
    if (!/^[0-9]{10}$/.test(inputs.contactNumber))
      temp.contactNumber = 'Contact number must be exactly 10 digits';
    if (!inputs.address || inputs.address.length < 5 || inputs.address.length > 200)
      temp.address = 'Address must be 5-200 characters long';
    if (!['Appeal', 'Objection'].includes(inputs.type))
      temp.type = 'Select Appeal or Objection';
    if (!inputs.reason || inputs.reason.length < 10 || inputs.reason.length > 300)
      temp.reason = 'Reason must be 10-300 characters long';
    if (!inputs.date) {
      temp.date = 'Date required';
    } else {
      const dateObj = new Date(inputs.date);
      if (isNaN(dateObj.getTime()) || dateObj > new Date())
        temp.date = 'Date must be a valid past or today';
    }
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post('http://localhost:5000/appeals', inputs);
      alert('Appeal/Objection submitted!');
      setInputs({
        applicantName: '', nic: '', contactNumber: '', address: '', type: '', reason: '', supportingDocs: '', date: '',
      });
      setErrors({});
      navigate('/view-appeals');
    } catch (err) {
      alert('Submission failed.');
    }
  };

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
        <h1>Appeal & Objection Form</h1>
        <form className="appeal-form-grid" onSubmit={handleSubmit}>
          {/* Applicant Name */}
          <div>
            <label>Applicant Name</label>
            <input
              type="text"
              name="applicantName"
              value={inputs.applicantName}
              onChange={handleChange}
              maxLength={100}
              autoComplete="off"
              pattern="[a-zA-Z\s]{3,100}"
              title="Name must be 3-100 letters and spaces only"
            />
            {errors.applicantName && <div className="error-msg">{errors.applicantName}</div>}
          </div>
          {/* NIC */}
          <div>
            <label>NIC</label>
            <input
              type="text"
              name="nic"
              value={inputs.nic}
              onChange={handleChange}
              maxLength={12}
              autoComplete="off"
              pattern="[0-9]{9}[vVxX]|[0-9]{12}"
              title="NIC must be 9 digits + V/X or 12 digits"
            />
            {errors.nic && <div className="error-msg">{errors.nic}</div>}
          </div>
          {/* Contact Number */}
          <div>
            <label>Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={inputs.contactNumber}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
              autoComplete="off"
              pattern="[0-9]{10}"
              title="Contact number must be exactly 10 digits"
            />
            {errors.contactNumber && <div className="error-msg">{errors.contactNumber}</div>}
          </div>
          {/* Address */}
          <div className="form-full">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={inputs.address}
              onChange={handleChange}
              maxLength={200}
              autoComplete="off"
              pattern="[a-zA-Z0-9\s,.-]{5,200}"
              title="Address must be 5-200 characters long"
            />
            {errors.address && <div className="error-msg">{errors.address}</div>}
          </div>
          {/* Type */}
          <div>
            <label>Type</label>
            <select name="type" value={inputs.type} onChange={handleChange}>
              <option value="">--Select--</option>
              <option value="Appeal">Appeal</option>
              <option value="Objection">Objection</option>
            </select>
            {errors.type && <div className="error-msg">{errors.type}</div>}
          </div>
          {/* Reason */}
          <div className="form-full">
            <label>Reason</label>
            <textarea
              name="reason"
              value={inputs.reason}
              onChange={handleChange}
              maxLength={300}
              autoComplete="off"
              title="Reason must be 10-300 characters long"
            ></textarea>
            {errors.reason && <div className="error-msg">{errors.reason}</div>}
          </div>
          {/* Supporting Documents */}
          <div className="form-full">
            <label>Supporting Documents (optional)</label>
            <input
              type="text"
              name="supportingDocs"
              value={inputs.supportingDocs}
              onChange={handleChange}
              maxLength={200}
              autoComplete="off"
              placeholder="Document names or links"
            />
          </div>
          {/* Date */}
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={inputs.date}
              onChange={handleChange}
            />
            {errors.date && <div className="error-msg">{errors.date}</div>}
          </div>
          {/* Submit */}
          <button className="appeal-btn" type="submit">Submit Appeal/Objection</button>
          {/* View Appeals & Objections */}
          <button
            type="button"
            className="appeal-btn secondary-btn"
            style={{ marginTop: 8, background: '#fff', color: '#F26722', border: '2px solid #F26722' }}
            onClick={() => navigate('/view-appeals')}
          >
            View Appeals & Objections
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default AppealObjection;
