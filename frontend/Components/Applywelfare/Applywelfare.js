import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import axios from "axios";
import "./ApplyWelfare.css"; // ✅ Import the CSS file here
import Footer from "../Footer/Footer";

function Applywelfare() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fullName: '',
    nic: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    address: '',
    gnDivision: '',
    contactNumber: '',
    householdIncome: '',
    occupation: '',
    dependents: '',
    headOfHousehold: 'No',
    programType: '',
    reason: '',
    requestedAmount: '',
    previousAidReceived: 'No',
    previousAidDetails: '',
    appliedDate: ''
  });
  const [errors, setErrors] = useState({});
  const genders = ['Male', 'Female', 'Other'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const yesNo = ['Yes', 'No'];
  const programs = ['Samurdhi', 'Elderly', 'Disability', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {};
    if (!inputs.fullName || inputs.fullName.length < 3) tempErrors.fullName = 'Full Name is required';
    if (!inputs.nic || !/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(inputs.nic)) tempErrors.nic = 'NIC is invalid';
    if (!inputs.dob) tempErrors.dob = 'Date of Birth is required';
    if (!genders.includes(inputs.gender)) tempErrors.gender = 'Gender is required';
    if (!maritalStatuses.includes(inputs.maritalStatus)) tempErrors.maritalStatus = 'Marital Status is required';
    if (!inputs.address || inputs.address.length < 5 || inputs.address.length > 200) tempErrors.address = 'Address must be 5-200 characters long';
    if (!inputs.gnDivision) tempErrors.gnDivision = 'GN Division is required';
    if (!/^[0-9]{10}$/.test(inputs.contactNumber)) tempErrors.contactNumber = 'Contact number must be exactly 10 digits';
    if (isNaN(inputs.householdIncome) || inputs.householdIncome < 0 || inputs.householdIncome > 1000000) tempErrors.householdIncome = 'Income must be between 0 and 1,000,000';
    if (inputs.occupation && inputs.occupation.length > 50) tempErrors.occupation = 'Occupation cannot exceed 50 characters';
    if (isNaN(inputs.dependents) || inputs.dependents < 0 || inputs.dependents > 20) tempErrors.dependents = 'Dependents must be between 0 and 20';
    if (!yesNo.includes(inputs.headOfHousehold)) tempErrors.headOfHousehold = 'Head of Household must be Yes or No';
    if (!programs.includes(inputs.programType)) tempErrors.programType = 'Program Type is required';
    if (!inputs.reason || inputs.reason.length < 10 || inputs.reason.length > 300) tempErrors.reason = 'Reason must be 10-300 characters long';
    if (isNaN(inputs.requestedAmount) || inputs.requestedAmount < 0 || inputs.requestedAmount > 500000) tempErrors.requestedAmount = 'Requested amount must be between 0 and 500,000';
    if (!yesNo.includes(inputs.previousAidReceived)) tempErrors.previousAidReceived = 'Previous Aid Received must be Yes or No';
    if (inputs.previousAidReceived === 'Yes' && (!inputs.previousAidDetails || inputs.previousAidDetails.trim().length < 5)) tempErrors.previousAidDetails = 'Previous aid details must be at least 5 characters';
    const appliedDate = new Date(inputs.appliedDate);
    if (!inputs.appliedDate || isNaN(appliedDate.getTime()) || appliedDate > new Date()) tempErrors.appliedDate = 'Applied date cannot be in the future';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post('http://localhost:5000/users', {
        ...inputs,
        dob: new Date(inputs.dob),
        appliedDate: new Date(inputs.appliedDate)
      });
      alert('Form submitted successfully!');
      setInputs({
        fullName: '',
        nic: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        address: '',
        gnDivision: '',
        contactNumber: '',
        householdIncome: '',
        occupation: '',
        dependents: '',
        headOfHousehold: 'No',
        programType: '',
        reason: '',
        requestedAmount: '',
        previousAidReceived: 'No',
        previousAidDetails: '',
        appliedDate: ''
      });
      setErrors({});
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message);
      alert('Failed to submit form. Check console for details.');
    }
  };

  return (
    <div className="apply-welfare-page">
      {/* <Nav /> */}
      <div className="apply-welfare-container">
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
        {/* Aswesuma Description */}
        <div className="aswesuma-description">
          <strong>Aswesuma Welfare Scheme</strong> <span>The Aswesuma Scheme, introduced by the Sri Lankan government, succeeds the Samurdhi Programme to provide more targeted and effective financial assistance to vulnerable populations. It ensures aid reaches those most in need through improved data collection and beneficiary selection, aiming to reduce poverty and support economic self-sufficiency among citizens.</span>
        </div>

        <h1>Aswasuma Aid Form</h1>
        <form onSubmit={handleSubmit}>
        
        {/* Full Name */}
        <div>
          <label>Full Name</label>
          <input type="text" name="fullName" value={inputs.fullName} onChange={handleChange} />
          {errors.fullName && <div>{errors.fullName}</div>}
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
            inputMode="text"
            autoComplete="off"
            pattern="[0-9]{9}[vVxX]|[0-9]{12}"
            title="NIC must be 9 digits + V/X or 12 digits"
          />
          {errors.nic && <div>{errors.nic}</div>}
        </div>

        {/* DOB */}
        <div>
          <label>Date of Birth</label>
          <input type="date" name="dob" value={inputs.dob} onChange={handleChange} />
          {errors.dob && <div>{errors.dob}</div>}
        </div>

        {/* Gender */}
        <div>
          <label>Gender</label>
          <select name="gender" value={inputs.gender} onChange={handleChange}>
            <option value="">--Select Gender--</option>
            {genders.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          {errors.gender && <div>{errors.gender}</div>}
        </div>

        {/* Marital Status */}
        <div>
          <label>Marital Status</label>
          <select name="maritalStatus" value={inputs.maritalStatus} onChange={handleChange}>
            <option value="">--Select Marital Status--</option>
            {maritalStatuses.map((ms) => (
              <option key={ms} value={ms}>{ms}</option>
            ))}
          </select>
          {errors.maritalStatus && <div>{errors.maritalStatus}</div>}
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
          {errors.contactNumber && <div>{errors.contactNumber}</div>}
        </div>

        {/* Address */}
        <div className="form-full">
          <label>Address</label>
          <input type="text" name="address" value={inputs.address} onChange={handleChange} />
          {errors.address && <div>{errors.address}</div>}
        </div>

        {/* GN Division */}
        <div>
          <label>GN Division</label>
          <input type="text" name="gnDivision" value={inputs.gnDivision} onChange={handleChange} />
          {errors.gnDivision && <div>{errors.gnDivision}</div>}
        </div>

        {/* Household Income */}
        <div>
          <label>Household Income</label>
          <input
            type="text"
            name="householdIncome"
            value={inputs.householdIncome}
            onChange={handleChange}
            maxLength={7}
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{1,7}"
            title="Income must be between 0 and 1,000,000"
          />
          {errors.householdIncome && <div>{errors.householdIncome}</div>}
        </div>

        {/* Occupation */}
        <div>
          <label>Occupation</label>
          <input type="text" name="occupation" value={inputs.occupation} onChange={handleChange} />
          {errors.occupation && <div>{errors.occupation}</div>}
        </div>

        {/* Dependents */}
        <div>
          <label>Dependents</label>
          <input
            type="text"
            name="dependents"
            value={inputs.dependents}
            onChange={handleChange}
            maxLength={2}
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{1,2}"
            title="Dependents must be between 0 and 20"
          />
          {errors.dependents && <div>{errors.dependents}</div>}
        </div>

        {/* Head of Household */}
        <div>
          <label>Head of Household</label>
          <select name="headOfHousehold" value={inputs.headOfHousehold} onChange={handleChange}>
            {yesNo.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.headOfHousehold && <div>{errors.headOfHousehold}</div>}
        </div>

        {/* Program Type */}
        <div>
          <label>Program Type</label>
          <select name="programType" value={inputs.programType} onChange={handleChange}>
            <option value="">--Select Program--</option>
            {programs.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.programType && <div>{errors.programType}</div>}
        </div>

        {/* Requested Amount */}
        <div>
          <label>Requested Amount</label>
          <input
            type="text"
            name="requestedAmount"
            value={inputs.requestedAmount}
            onChange={handleChange}
            maxLength={6}
            inputMode="numeric"
            autoComplete="off"
            pattern="[0-9]{1,6}"
            title="Requested amount must be between 0 and 500,000"
          />
          {errors.requestedAmount && <div>{errors.requestedAmount}</div>}
        </div>

        {/* Reason */}
        <div className="form-full">
          <label>Reason</label>
          <textarea name="reason" value={inputs.reason} onChange={handleChange}></textarea>
          {errors.reason && <div>{errors.reason}</div>}
        </div>

        {/* Previous Aid Received */}
        <div>
          <label>Previous Aid Received</label>
          <select name="previousAidReceived" value={inputs.previousAidReceived} onChange={handleChange}>
            {yesNo.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          {errors.previousAidReceived && <div>{errors.previousAidReceived}</div>}
        </div>

        {/* Previous Aid Details */}
        {inputs.previousAidReceived === "Yes" && (
          <div className="form-full">
            <label>Previous Aid Details</label>
            <textarea name="previousAidDetails" value={inputs.previousAidDetails} onChange={handleChange}></textarea>
            {errors.previousAidDetails && <div>{errors.previousAidDetails}</div>}
          </div>
        )}

        {/* Applied Date */}
        <div>
          <label>Applied Date</label>
          <input type="date" name="appliedDate" value={inputs.appliedDate} onChange={handleChange} />
          {errors.appliedDate && <div>{errors.appliedDate}</div>}
        </div>

        {/* Submit */}
        <button type="submit" className="form-full">Submit</button>

      </form>
      </div>
      <Footer />
    </div>
  );
}

export default Applywelfare;

