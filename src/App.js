import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login'; 
import Home from './pages/home'; 
import Register from './pages/register'; 
import Inventory from './pages/inventory';
import Billing from './pages/billing';
import Appointments from './pages/appointments';
import FinancialReports from './pages/financialReports';
import Landing from './pages/landing';
import Profile from './pages/profile';
import PatientRecords from './pages/patientRecords';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/financialReports" element={<FinancialReports />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/records" element={<PatientRecords />} />
      </Routes>
    </Router>
  );
}


export default App;