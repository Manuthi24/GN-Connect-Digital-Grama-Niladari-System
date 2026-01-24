import React from "react";
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import Welfare from "./Components/Welfare/Welfare";
import Applywelfare from "./Components/Applywelfare/Applywelfare";
import Welfaredetails from "./Components/Welfaredetails/Welfaredetails";
import UpdateWelfare from "./Components/UpdateWelfare/UpdateWelfare";

import AswasumaDescription from "./Components/AswasumaDescription";
import AppealObjection from "./Components/AppealObjection/AppealObjection";
import ViewAppeals from "./Components/AppealObjection/ViewAppeals";
import AppealDetail from "./Components/AppealObjection/AppealDetail";
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";


function App() {
  return (
    <div>
      <Nav />
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aswasuma" element={<AswasumaDescription />} />
          <Route path="/apply-welfare" element={<Applywelfare />} />
          <Route path="/view-welfare" element={<Welfaredetails />} />
          <Route path="/view-welfare/:id" element={<UpdateWelfare />} />
          <Route path="/appeal-objection" element={<AppealObjection />} />
          <Route path="/view-appeals" element={<ViewAppeals />} />
          <Route path="/appeal/:id" element={<AppealDetail />} />
          {/* Placeholder routes for navigation bar links */}
          <Route path="/family-management" element={<div style={{padding: '2rem'}}>Family Management Page</div>} />
          <Route path="/issuing-of-certificates" element={<div style={{padding: '2rem'}}>GN Document Page</div>} />
          <Route path="/voter-enrollment" element={<div style={{padding: '2rem'}}>Voter Enrollment Page</div>} />
          <Route path="/land-property" element={<div style={{padding: '2rem'}}>Land and Property Page</div>} />
          <Route path="/GN-Home" element={<div style={{padding: '2rem'}}>Admin Page</div>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
