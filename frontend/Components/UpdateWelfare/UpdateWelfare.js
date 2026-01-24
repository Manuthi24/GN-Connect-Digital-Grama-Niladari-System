import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import './Updatewelfare.css'; // Import CSS for styling

function UpdateWelfare() {
  const [inputs, setInputs] = useState({
    fullName: "",
    nic: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    address: "",
    gnDivision: "",
    contactNumber: "",
    householdIncome: "",
    occupation: "",
    dependents: 0,
    headOfHousehold: "No",
    programType: "",
    reason: "",
    requestedAmount: "",
    previousAidReceived: "No",
    previousAidDetails: "",
    appliedDate: ""
  });

  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const genders = ["Male", "Female", "Other"];
  const maritalStatuses = ["Single", "Married", "Widowed", "Divorced", "Other"];
  const programs = [
    "Samurdhi",
    "Elderly Pension",
    "Disability Aid",
    "Education Aid",
    "Housing Aid",
    "Medical Aid",
    "Other"
  ];
  const yesNo = ["Yes", "No"];

  // helper to format ISO date -> YYYY-MM-DD
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        const user = res.data.user;

        setInputs({
          fullName: user.fullName || "",
          nic: user.nic || "",
          dob: formatDate(user.dob),
          gender: user.gender || "",
          maritalStatus: user.maritalStatus || "",
          address: user.address || "",
          gnDivision: user.gnDivision || "",
          contactNumber: user.contactNumber || "",
          householdIncome: user.householdIncome || "",
          occupation: user.occupation || "",
          dependents: user.dependents || 0,
          headOfHousehold: user.headOfHousehold || "No",
          programType: user.programType || "",
          reason: user.reason || "",
          requestedAmount: user.requestedAmount || "",
          previousAidReceived: user.previousAidReceived || "No",
          previousAidDetails: user.previousAidDetails || "",
          appliedDate: formatDate(user.appliedDate)
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "nic") {
      let filtered = value.replace(/[^0-9vVxX]/g, "");
      if (/^[0-9]{0,9}$/.test(filtered)) {
        setInputs((prev) => ({ ...prev, [name]: filtered }));
      } else if (/^[0-9]{9}[vVxX]?$/.test(filtered)) {
        setInputs((prev) => ({ ...prev, [name]: filtered.slice(0,10) }));
      } else if (/^[0-9]{10,12}$/.test(filtered)) {
        setInputs((prev) => ({ ...prev, [name]: filtered.slice(0,12) }));
      } else {
        setInputs((prev) => ({ ...prev, [name]: filtered.slice(0,12) }));
      }
      return;
    }
    if (name === "contactNumber") {
      let filtered = value.replace(/[^0-9]/g, "").slice(0, 10);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "householdIncome") {
      let filtered = value.replace(/[^0-9]/g, "").slice(0, 7);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "dependents") {
      let filtered = value.replace(/[^0-9]/g, "").slice(0, 2);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "requestedAmount") {
      let filtered = value.replace(/[^0-9]/g, "").slice(0, 6);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "fullName") {
      let filtered = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 100);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "address") {
      let filtered = value.replace(/[^a-zA-Z0-9\s,.-]/g, "").slice(0, 200);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "occupation") {
      let filtered = value.replace(/[^a-zA-Z\s]/g, "").slice(0, 50);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "gnDivision") {
      let filtered = value.replace(/[^a-zA-Z0-9\s]/g, "").slice(0, 50);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "reason") {
      let filtered = value.replace(/[^\x20-\x7E]/g, "").slice(0, 300);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    if (name === "previousAidDetails") {
      let filtered = value.replace(/[^\x20-\x7E]/g, "").slice(0, 300);
      setInputs((prev) => ({ ...prev, [name]: filtered }));
      return;
    }
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const tempErrors = {};

    if (!inputs.fullName || !/^[a-zA-Z\s]{3,100}$/.test(inputs.fullName))
      tempErrors.fullName = "Full Name must be 3-100 letters and spaces only";

    if (!inputs.nic || !/^[0-9]{9}[vVxX]$|^[0-9]{12}$/.test(inputs.nic))
      tempErrors.nic = "NIC must be 9 digits + V/X or 12 digits";

    const dobDate = new Date(inputs.dob);
    if (!inputs.dob || isNaN(dobDate.getTime()) || dobDate >= new Date())
      tempErrors.dob = "Date of Birth must be a valid past date";

    if (!genders.includes(inputs.gender))
      tempErrors.gender = "Gender is required";

    if (!maritalStatuses.includes(inputs.maritalStatus))
      tempErrors.maritalStatus = "Marital Status is required";

    if (!inputs.address || inputs.address.length < 5 || inputs.address.length > 200)
      tempErrors.address = "Address must be 5-200 characters long";

    if (!inputs.gnDivision)
      tempErrors.gnDivision = "GN Division is required";

    if (!/^[0-9]{10}$/.test(inputs.contactNumber))
      tempErrors.contactNumber = "Contact number must be exactly 10 digits";

    if (isNaN(inputs.householdIncome) || inputs.householdIncome < 0 || inputs.householdIncome > 1000000)
      tempErrors.householdIncome = "Income must be between 0 and 1,000,000";

    if (inputs.occupation && inputs.occupation.length > 50)
      tempErrors.occupation = "Occupation cannot exceed 50 characters";

    if (isNaN(inputs.dependents) || inputs.dependents < 0 || inputs.dependents > 20)
      tempErrors.dependents = "Dependents must be between 0 and 20";

    if (!yesNo.includes(inputs.headOfHousehold))
      tempErrors.headOfHousehold = "Head of Household must be Yes or No";

    if (!programs.includes(inputs.programType))
      tempErrors.programType = "Program Type is required";

    if (!inputs.reason || inputs.reason.length < 10 || inputs.reason.length > 300)
      tempErrors.reason = "Reason must be 10-300 characters long";

    if (isNaN(inputs.requestedAmount) || inputs.requestedAmount < 0 || inputs.requestedAmount > 500000)
      tempErrors.requestedAmount = "Requested amount must be between 0 and 500,000";

    if (!yesNo.includes(inputs.previousAidReceived))
      tempErrors.previousAidReceived = "Previous Aid Received must be Yes or No";

    if (inputs.previousAidReceived === "Yes" && (!inputs.previousAidDetails || inputs.previousAidDetails.trim().length < 5))
      tempErrors.previousAidDetails = "Previous aid details must be at least 5 characters";

    const appliedDate = new Date(inputs.appliedDate);
    if (!inputs.appliedDate || isNaN(appliedDate.getTime()) || appliedDate > new Date())
      tempErrors.appliedDate = "Applied date cannot be in the future";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        ...inputs,
        dob: new Date(inputs.dob),
        appliedDate: new Date(inputs.appliedDate),
        householdIncome: Number(inputs.householdIncome),
        dependents: Number(inputs.dependents),
        requestedAmount: Number(inputs.requestedAmount),
      });
      alert("Data updated successfully!");
      navigate("/view-welfare");
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      alert("Failed to update. Check console for details.");
    }
  };

  return (
    <div className="update-welfare-page">
      <div className="update-welfare-container">
      <h1>Update Aswasuma Aid Form</h1>
      <form onSubmit={handleSubmit}>
        {/* 18 Sections */}
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={inputs.fullName}
            onChange={handleChange}
            maxLength={100}
            autoComplete="off"
            pattern="[a-zA-Z\s]{3,100}"
            title="Full Name must be 3-100 letters and spaces only"
          />
          {errors.fullName && <div style={{ color: "red" }}>{errors.fullName}</div>}
        </div>

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
          {errors.nic && <div style={{ color: "red" }}>{errors.nic}</div>}
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" name="dob" value={inputs.dob} onChange={handleChange} />
          {errors.dob && <div style={{ color: "red" }}>{errors.dob}</div>}
        </div>

        <div>
          <label>Gender</label>
          <select name="gender" value={inputs.gender} onChange={handleChange}>
            <option value="">--Select Gender--</option>
            {genders.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
          {errors.gender && <div style={{ color: "red" }}>{errors.gender}</div>}
        </div>

        <div>
          <label>Marital Status</label>
          <select name="maritalStatus" value={inputs.maritalStatus} onChange={handleChange}>
            <option value="">--Select Marital Status--</option>
            {maritalStatuses.map(ms => <option key={ms} value={ms}>{ms}</option>)}
          </select>
          {errors.maritalStatus && <div style={{ color: "red" }}>{errors.maritalStatus}</div>}
        </div>

        <div>
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
          {errors.address && <div style={{ color: "red" }}>{errors.address}</div>}
        </div>

        <div>
          <label>GN Division</label>
          <input
            type="text"
            name="gnDivision"
            value={inputs.gnDivision}
            onChange={handleChange}
            maxLength={50}
            autoComplete="off"
            pattern="[a-zA-Z0-9\s]{0,50}"
            title="GN Division cannot exceed 50 characters"
          />
          {errors.gnDivision && <div style={{ color: "red" }}>{errors.gnDivision}</div>}
        </div>

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
          {errors.contactNumber && <div style={{ color: "red" }}>{errors.contactNumber}</div>}
        </div>

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
          {errors.householdIncome && <div style={{ color: "red" }}>{errors.householdIncome}</div>}
        </div>

        <div>
          <label>Occupation</label>
          <input
            type="text"
            name="occupation"
            value={inputs.occupation}
            onChange={handleChange}
            maxLength={50}
            autoComplete="off"
            pattern="[a-zA-Z\s]{0,50}"
            title="Occupation cannot exceed 50 characters"
          />
          {errors.occupation && <div style={{ color: "red" }}>{errors.occupation}</div>}
        </div>

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
          {errors.dependents && <div style={{ color: "red" }}>{errors.dependents}</div>}
        </div>

        <div>
          <label>Head of Household</label>
          <select name="headOfHousehold" value={inputs.headOfHousehold} onChange={handleChange}>
            {yesNo.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {errors.headOfHousehold && <div style={{ color: "red" }}>{errors.headOfHousehold}</div>}
        </div>

        <div>
          <label>Program Type</label>
          <select name="programType" value={inputs.programType} onChange={handleChange}>
            <option value="">--Select Program--</option>
            {programs.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          {errors.programType && <div style={{ color: "red" }}>{errors.programType}</div>}
        </div>

        <div>
          <label>Reason</label>
          <textarea
            name="reason"
            value={inputs.reason}
            onChange={handleChange}
            maxLength={300}
            autoComplete="off"
            title="Reason must be 10-300 characters long"
          ></textarea>
          {errors.reason && <div style={{ color: "red" }}>{errors.reason}</div>}
        </div>

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
          {errors.requestedAmount && <div style={{ color: "red" }}>{errors.requestedAmount}</div>}
        </div>

        <div>
          <label>Previous Aid Received</label>
          <select name="previousAidReceived" value={inputs.previousAidReceived} onChange={handleChange}>
            {yesNo.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          {errors.previousAidReceived && <div style={{ color: "red" }}>{errors.previousAidReceived}</div>}
        </div>

        {inputs.previousAidReceived === "Yes" && (
          <div>
            <label>Previous Aid Details</label>
            <textarea
              name="previousAidDetails"
              value={inputs.previousAidDetails}
              onChange={handleChange}
              maxLength={300}
              autoComplete="off"
              title="Previous aid details must be at least 5 characters"
            ></textarea>
            {errors.previousAidDetails && <div style={{ color: "red" }}>{errors.previousAidDetails}</div>}
          </div>
        )}

        <div>
          <label>Applied Date</label>
          <input type="date" name="appliedDate" value={inputs.appliedDate} onChange={handleChange} />
          {errors.appliedDate && <div style={{ color: "red" }}>{errors.appliedDate}</div>}
        </div>

        <button type="submit">Update</button>
      </form>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateWelfare;
