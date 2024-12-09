import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Markitup from './markitup/Markitup';
import FreelancerDashboard from './markitup/FreelancerDashboard';
import ClientAccessPage from './markitup/ClientAccessPage';
import ProjectPage from './markitup/ProjectPage';
import FreelancerProjectPage from './markitup/FreelancerProjectPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/markitup" element={<Markitup />} /> {/* New Route */}
        <Route path="/markitup/dashboard" element={<FreelancerDashboard />} />
        <Route path="/project/access" element={<ClientAccessPage />} />
        <Route path="/project/:projectID" element={<ProjectPage />} />
        <Route path="/freelancer/project/:projectID" element={<FreelancerProjectPage />} />



      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
