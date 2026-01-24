import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import govLogo from '../../assets/aswasuma/gov_logo.png';

function Welfare(props) {
  const history = useNavigate(); // ✅ hook at the top
  const reportRef = useRef();
  const handleDownloadPDF = () => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    // Add government logo centered at the top
    const imgWidth = 70;
    const imgHeight = 70;
    const imgX = (pageWidth - imgWidth) / 2;
    let y = 30;
    pdf.addImage(govLogo, 'PNG', imgX, y, imgWidth, imgHeight);
    y += imgHeight + 10;
    // Official header (multi-line)
    const headerLines = [
      'Department of Samurdhi Development',
      'Ministry of Women, Child Affairs and Social Empowerment',
      'Samurdhi Development Officer – Grama Niladhari Division Level',
      'Selection / Renewal Application – 2025'
    ];
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(15);
    headerLines.forEach(line => {
      const textWidth = pdf.getTextWidth(line);
      pdf.text(line, (pageWidth - textWidth) / 2, y);
      y += 22;
    });
    y += 10;
    // Main report title, larger and bold, also centered
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(22);
    const reportTitle = 'Welfare Applicant Report';
    const reportTitleWidth = pdf.getTextWidth(reportTitle);
    pdf.text(reportTitle, (pageWidth - reportTitleWidth) / 2, y);
    y += 32;
    // Applicant number, normal font, centered
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(12);
    const applicantNum = `Applicant Number: ${index + 1}`;
    const applicantNumWidth = pdf.getTextWidth(applicantNum);
    pdf.text(applicantNum, (pageWidth - applicantNumWidth) / 2, y);
    y += 20;

    const rows = [
      ['Full Name', fullName],
      ['NIC', nic],
      ['Date of Birth', formattedDob],
      ['Gender', gender],
      ['Marital Status', maritalStatus],
      ['Address', address],
      ['GN Division', gnDivision],
      ['Contact Number', contactNumber],
      ['Household Income', householdIncome],
      ['Occupation', occupation],
      ['Dependents', dependents],
      ['Head of Household', headOfHousehold],
      ['Program Type', programType],
      ['Reason for Applying Welfare Aid', reason],
      ['Requested Amount', requestedAmount],
      ['Previous Aid Received', previousAidReceived],
      ['Previous Aid Details', previousAidDetails],
      ['Applied Date', formattedAppliedDate],
    ];

    autoTable(pdf, {
      body: rows,
      styles: { cellPadding: 6, fontSize: 11 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      margin: { left: 40, right: 40 },
      tableWidth: 'auto',
    });
    pdf.save(`Welfare_Report_${props.user && props.user.nic ? props.user.nic : ''}.pdf`);
  };

  if (!props || !props.user) {
    return (
      <div>
        <h2>No data available</h2>
      </div>
    );
  }

  const {
    fullName,
    nic,
    dob,
    gender,
    maritalStatus,
    address,
    gnDivision,
    contactNumber,
    householdIncome,
    occupation,
    dependents,
    headOfHousehold,
    programType,
    reason,
    requestedAmount,
    previousAidReceived,
    previousAidDetails,
    appliedDate
  } = props.user;

  const { index } = props; // ✅ get applicant index

  // ✅ Convert to readable date only (YYYY-MM-DD)
  const formattedDob = dob ? new Date(dob).toISOString().split('T')[0] : "N/A";
  const formattedAppliedDate = appliedDate ? new Date(appliedDate).toISOString().split('T')[0] : "N/A";

  const deleteHandler = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/users/${props.user._id}`);
      window.alert("Record deleted successfully ✅");
      history("/view-welfare");
    } catch (err) {
      console.error(err);
      window.alert("❌ Failed to delete record. Please try again.");
    }
  };

  return (
    <div className="dashboard-background">
      <div>
        <h2>Applicant {index + 1}</h2>
        <div
          ref={reportRef}
          style={{
            background: '#fff',
            padding: '32px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            maxWidth: 700,
            margin: '0 auto 24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            fontFamily: 'Arial, sans-serif',
            color: '#222'
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: 32, fontSize: 28, letterSpacing: 1 }}>Welfare Applicant Report</h1>
          <hr style={{ marginBottom: 24 }} />
          <div style={{ marginBottom: 18 }}><b>Full Name:</b> {fullName}</div>
          <div style={{ marginBottom: 18 }}><b>NIC:</b> {nic}</div>
          <div style={{ marginBottom: 18 }}><b>Date of Birth:</b> {formattedDob}</div>
          <div style={{ marginBottom: 18 }}><b>Gender:</b> {gender}</div>
          <div style={{ marginBottom: 18 }}><b>Marital Status:</b> {maritalStatus}</div>
          <div style={{ marginBottom: 18 }}><b>Address:</b> {address}</div>
          <div style={{ marginBottom: 18 }}><b>GN Division:</b> {gnDivision}</div>
          <div style={{ marginBottom: 18 }}><b>Contact Number:</b> {contactNumber}</div>
          <div style={{ marginBottom: 18 }}><b>Household Income:</b> {householdIncome}</div>
          <div style={{ marginBottom: 18 }}><b>Occupation:</b> {occupation}</div>
          <div style={{ marginBottom: 18 }}><b>Dependents:</b> {dependents}</div>
          <div style={{ marginBottom: 18 }}><b>Head of Household:</b> {headOfHousehold}</div>
          <div style={{ marginBottom: 18 }}><b>Program Type:</b> {programType}</div>
          <div style={{ marginBottom: 18 }}><b>Reason for Applying Welfare Aid:</b> {reason}</div>
          <div style={{ marginBottom: 18 }}><b>Requested Amount:</b> {requestedAmount}</div>
          <div style={{ marginBottom: 18 }}><b>Previous Aid Received:</b> {previousAidReceived}</div>
          <div style={{ marginBottom: 18 }}><b>Previous Aid Details:</b> {previousAidDetails}</div>
          <div style={{ marginBottom: 18 }}><b>Applied Date:</b> {formattedAppliedDate}</div>
          <hr style={{ margin: '32px 0 0 0' }} />
        </div>
        <div className="action-buttons">
          <Link to={`/view-welfare/${props.user._id}`}>Update</Link>
          <button onClick={deleteHandler}>Delete</button>
          <button onClick={handleDownloadPDF} style={{marginLeft: '10px'}}>Download PDF</button>
        </div>
      </div>
    </div>
  );
}

export default Welfare;
