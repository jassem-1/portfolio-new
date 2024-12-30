import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Markitup from './markitup/Markitup';
import FreelancerDashboard from './markitup/FreelancerDashboard';
import ProjectPage from './markitup/ProjectPage';
import FreelancerProjectPage from './markitup/FreelancerProjectPage';
import AccessPage from './markitup/Markitup'
import Annotation from './markitup/Annotation.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/markitup" element={<AccessPage />} /> {/* New Route */}
        <Route path="/markitup/dashboard" element={<FreelancerDashboard />} />
        <Route path="/project/:projectID" element={<ProjectPage />} />
        <Route path="/freelancer/project/:projectID" element={<FreelancerProjectPage />} />
        <Route path="/annotate" element={<Annotation />} />



      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
