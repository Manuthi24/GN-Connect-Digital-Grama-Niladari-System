import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import jsPDF from 'jspdf';

import './AppealObjection.css';

function AppealDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appeal, setAppeal] = useState(null);
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState({
    applicantName: '',
    nic: '',
    contactNumber: '',
    address: '',
    type: '',
    reason: '',
    supportingDocs: '',
    date: ''
  });
  const [errors, setErrors] = useState({});


  // Sync form inputs with appeal data when entering edit mode
  useEffect(() => {
    if (edit && appeal) {
      setInputs({
        applicantName: appeal.applicantName || '',
        nic: appeal.nic || '',
        contactNumber: appeal.contactNumber || '',
        address: appeal.address || '',
        type: appeal.type || '',
        reason: appeal.reason || '',
        supportingDocs: appeal.supportingDocs || '',
        date: appeal.date ? appeal.date.slice(0,10) : ''
      });
    }
  }, [edit, appeal]);
  useEffect(() => {
    axios.get(`http://localhost:5000/appeals/${id}`)
      .then(res => {
        const data = res.data.appeal || {};
        setAppeal(data);
        setInputs({
          applicantName: data.applicantName || '',
          nic: data.nic || '',
          contactNumber: data.contactNumber || '',
          address: data.address || '',
          type: data.type || '',
          reason: data.reason || '',
          supportingDocs: data.supportingDocs || '',
          date: data.date ? data.date.slice(0,10) : ''
        });
      })
      .catch(() => setAppeal(null));
  }, [id]);


  // Real-time validation on change
  const handleChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
    // Validate this field only
    let err = '';
    if (name === 'applicantName' && !value.match(/^[a-zA-Z\s]{3,100}$/)) err = 'Name must be 3-100 letters and spaces only';
    if (name === 'nic' && !value.match(/^([0-9]{9}[vVxX]|[0-9]{12})$/)) err = 'NIC must be 9 digits + V/X or 12 digits';
    if (name === 'contactNumber' && !value.match(/^[0-9]{10}$/)) err = 'Contact number must be exactly 10 digits';
    if (name === 'address' && !value.match(/^[a-zA-Z0-9\s,.-]{5,200}$/)) err = 'Address must be 5-200 characters';
    if (name === 'type' && !value) err = 'Type is required';
    if (name === 'reason' && (!value || value.length < 10)) err = 'Reason must be 10-300 characters';
    if (name === 'date' && !value) err = 'Date is required';
    setErrors(prev => ({ ...prev, [name]: err }));
  };

  const validate = () => {
    const errs = {};
    if (!inputs.applicantName.match(/^[a-zA-Z\s]{3,100}$/)) errs.applicantName = 'Name must be 3-100 letters and spaces only';
    if (!inputs.nic.match(/^([0-9]{9}[vVxX]|[0-9]{12})$/)) errs.nic = 'NIC must be 9 digits + V/X or 12 digits';
    if (!inputs.contactNumber.match(/^[0-9]{10}$/)) errs.contactNumber = 'Contact number must be exactly 10 digits';
    if (!inputs.address.match(/^[a-zA-Z0-9\s,.-]{5,200}$/)) errs.address = 'Address must be 5-200 characters';
    if (!inputs.type) errs.type = 'Type is required';
    if (!inputs.reason || inputs.reason.length < 10) errs.reason = 'Reason must be 10-300 characters';
    if (!inputs.date) errs.date = 'Date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleUpdate = e => {
    e.preventDefault();
    if (!validate()) return;
    axios.put(`http://localhost:5000/appeals/${id}`, inputs)
      .then(res => {
        const data = res.data.appeal || {};
        setAppeal(data);
        setInputs({
          applicantName: data.applicantName || '',
          nic: data.nic || '',
          contactNumber: data.contactNumber || '',
          address: data.address || '',
          type: data.type || '',
          reason: data.reason || '',
          supportingDocs: data.supportingDocs || '',
          date: data.date ? data.date.slice(0,10) : ''
        });
        setEdit(false);
      })
      .catch(err => {
        alert('Update failed');
      });
  };

  const handleDelete = () => {
    if (!window.confirm('Are you sure you want to delete this appeal/objection?')) return;
  axios.delete(`http://localhost:5000/appeals/${id}`)
      .then(() => {
        alert('Deleted successfully');
        navigate('/view-appeals');
      })
      .catch(() => alert('Delete failed'));
  };

  const handleDownloadPDF = () => {
    const data = edit ? inputs : appeal;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 40;
    // Blue header background
    doc.setFillColor(41, 128, 185); // blue
    doc.rect(0, y - 30, pageWidth, 100, 'F');
    // Official header (multi-line, centered, white text)
    const headerLines = [
      'Department of Samurdhi Development',
      'Ministry of Women, Child Affairs and Social Empowerment',
      'Samurdhi Development Officer – Grama Niladhari Division Level',
      'Appeal/Objection Report – 2025'
    ];
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255,255,255);
    let headerY = y;
    headerLines.forEach(line => {
      const textWidth = doc.getTextWidth(line);
      doc.text(line, (pageWidth - textWidth) / 2, headerY);
      headerY += 22;
    });
    y = headerY + 10;
    // Main report title, larger and bold, also centered, colored
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(41, 128, 185); // blue
    const reportTitle = 'Appeal/Objection Details';
    const reportTitleWidth = doc.getTextWidth(reportTitle);
    doc.text(reportTitle, (pageWidth - reportTitleWidth) / 2, y);
  y += 48; // Increased space between title and information
  // Details block background
  const detailsStartY = y - 10;
    const details = [
      ['Name', data.applicantName || ''],
      ['NIC', data.nic || ''],
      ['Contact Number', data.contactNumber || ''],
      ['Address', data.address || ''],
      ['Type', data.type || ''],
      ['Reason', data.reason || ''],
      ['Supporting Documents', data.supportingDocs || ''],
      ['Date', data.date ? data.date.slice(0,10) : '']
    ];
    const rowHeight = 22;
    doc.setFillColor(245, 245, 245); // light gray
    doc.rect(40, detailsStartY, pageWidth - 80, details.length * rowHeight + 10, 'F');
    // Details block (left-aligned, label + value)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(44, 62, 80); // dark gray
    details.forEach(([label, value], i) => {
      const rowY = y + i * rowHeight;
      doc.text(`${label}:`, 60, rowY);
      doc.text(`${value}`, 200, rowY, { maxWidth: pageWidth - 220 });
    });
    doc.save(`appeal_objection_${data.nic || 'unknown'}.pdf`);
  };

  if (!appeal) {
    return (
      <div className="appeal-objection-page">
        <div className="appeal-objection-container">Not found.</div>
        <Footer />
      </div>
    );
  }

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
        <h1>Appeal/Objection Details</h1>
        {edit ? (
          <form className="appeal-form-grid" onSubmit={handleUpdate} style={{marginTop: 18}}>
            <div>
              <label>Applicant Name</label>
              <input name="applicantName" value={inputs.applicantName} onChange={handleChange} maxLength={100} autoComplete="off" pattern="[a-zA-Z\s]{3,100}" title="Name must be 3-100 letters and spaces only" />
              {errors.applicantName && <div className="error-msg">{errors.applicantName}</div>}
            </div>
            <div>
              <label>NIC</label>
              <input name="nic" value={inputs.nic} onChange={handleChange} maxLength={12} autoComplete="off" pattern="[0-9]{9}[vVxX]|[0-9]{12}" title="NIC must be 9 digits + V/X or 12 digits" />
              {errors.nic && <div className="error-msg">{errors.nic}</div>}
            </div>
            <div>
              <label>Contact Number</label>
              <input name="contactNumber" value={inputs.contactNumber} onChange={handleChange} maxLength={10} inputMode="numeric" autoComplete="off" pattern="[0-9]{10}" title="Contact number must be exactly 10 digits" />
              {errors.contactNumber && <div className="error-msg">{errors.contactNumber}</div>}
            </div>
            <div className="form-full">
              <label>Address</label>
              <input name="address" value={inputs.address} onChange={handleChange} maxLength={200} autoComplete="off" pattern="[a-zA-Z0-9\s,.-]{5,200}" title="Address must be 5-200 characters long" />
              {errors.address && <div className="error-msg">{errors.address}</div>}
            </div>
            <div>
              <label>Type</label>
              <select name="type" value={inputs.type} onChange={handleChange}>
                <option value="">--Select--</option>
                <option value="Appeal">Appeal</option>
                <option value="Objection">Objection</option>
              </select>
              {errors.type && <div className="error-msg">{errors.type}</div>}
            </div>
            <div className="form-full">
              <label>Reason</label>
              <textarea name="reason" value={inputs.reason} onChange={handleChange} maxLength={300} autoComplete="off" title="Reason must be 10-300 characters long"></textarea>
              {errors.reason && <div className="error-msg">{errors.reason}</div>}
            </div>
            <div className="form-full">
              <label>Supporting Documents (optional)</label>
              <input name="supportingDocs" value={inputs.supportingDocs} onChange={handleChange} maxLength={200} autoComplete="off" placeholder="Document names or links" />
            </div>
            <div>
              <label>Date</label>
              <input type="date" name="date" value={inputs.date ? inputs.date.slice(0,10) : ''} onChange={handleChange} />
              {errors.date && <div className="error-msg">{errors.date}</div>}
            </div>
            <button className="appeal-btn" type="submit">Save</button>
            <button className="appeal-btn secondary-btn" type="button" style={{marginLeft:8}} onClick={() => setEdit(false)}>Cancel</button>
          </form>
        ) : (
          <div className="appeal-detail-card">
            <div className="detail-row"><span className="detail-label">Name:</span> <span>{appeal.applicantName}</span></div>
            <div className="detail-row"><span className="detail-label">NIC:</span> <span>{appeal.nic}</span></div>
            <div className="detail-row"><span className="detail-label">Contact Number:</span> <span>{appeal.contactNumber}</span></div>
            <div className="detail-row"><span className="detail-label">Address:</span> <span>{appeal.address}</span></div>
            <div className="detail-row"><span className="detail-label">Type:</span> <span>{appeal.type}</span></div>
            <div className="detail-row"><span className="detail-label">Reason:</span> <span>{appeal.reason}</span></div>
            <div className="detail-row"><span className="detail-label">Supporting Documents:</span> <span>{appeal.supportingDocs}</span></div>
            <div className="detail-row"><span className="detail-label">Date:</span> <span>{appeal.date ? appeal.date.slice(0,10) : ''}</span></div>
            <div className="action-btn-row">
              <button
                className="appeal-btn"
                title="Edit"
                onClick={() => {
                  if (appeal) {
                    setInputs({
                      applicantName: appeal.applicantName || '',
                      nic: appeal.nic || '',
                      contactNumber: appeal.contactNumber || '',
                      address: appeal.address || '',
                      type: appeal.type || '',
                      reason: appeal.reason || '',
                      supportingDocs: appeal.supportingDocs || '',
                      date: appeal.date ? appeal.date.slice(0,10) : ''
                    });
                  }
                  setEdit(true);
                }}
              >
                <span role="img" aria-label="Edit">✏️</span> Edit
              </button>
              <button className="appeal-btn secondary-btn" title="Delete" style={{marginLeft:8}} onClick={handleDelete}><span role="img" aria-label="Delete">🗑️</span> Delete</button>
              <button className="appeal-btn secondary-btn" title="Download PDF" style={{marginLeft:8}} onClick={handleDownloadPDF}><span role="img" aria-label="Download">⬇️</span> Download PDF</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default AppealDetail;
