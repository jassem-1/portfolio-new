import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types';
import Markitup from './markitup/Markitup';
import FreelancerDashboard from './markitup/FreelancerDashboard';
import ProjectPage from './markitup/ProjectPage';
import FreelancerProjectPage from './markitup/FreelancerProjectPage';
import AccessPage from './markitup/Markitup'
import Annotation from './markitup/Annotation.jsx'
import AnnotationSuccess from './markitup/AnnotationSuccess.jsx'
import VideoDetailPage from './markitup/ViewDetailsPage.jsx'


const DesktopOnlyRoute = ({ element }) => {
  const isDesktop = window.innerWidth >= 1000;

  if (!isDesktop) {
    return <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800 text-lg">This page is only accessible on desktop screens</div>;
  }

  return element;
};

DesktopOnlyRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/markitup" element={<DesktopOnlyRoute element={<AccessPage />} />} />
        <Route path="/markitup/dashboard" element={<DesktopOnlyRoute element={<FreelancerDashboard />} />} />
        <Route path="/project/:projectID" element={<DesktopOnlyRoute element={<ProjectPage />} />} />
        <Route path="/freelancer/project/:projectID" element={<DesktopOnlyRoute element={<FreelancerProjectPage />} />} />
        <Route path="/annotate" element={<DesktopOnlyRoute element={<Annotation />} />} />
        <Route path="/projects/:projectID/videos/:videoID" element={<DesktopOnlyRoute element={<VideoDetailPage />} />} />
        <Route path="/annotation-success" element={<DesktopOnlyRoute element={<AnnotationSuccess />} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
