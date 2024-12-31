import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const FreelancerDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch Projects from Firestore
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsList);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create a New Project
  const createProject = async () => {
    const accessCode = Math.random().toString(36).substr(2, 8); // Generate a random access code
    try {
      await addDoc(collection(db, "projects"), {
        name: newProjectName,
        description: newProjectDescription,
        accessCode,
        createdAt: new Date(),
      });
      alert(`Project created successfully! Access Code: ${accessCode}`);
      setNewProjectName("");
      setNewProjectDescription("");
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Freelancer Dashboard</h1>

      {/* Create New Project Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create New Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="w-full mb-4 p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Project Description"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          className="w-full mb-4 p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={createProject}
          className=" bg-blue-500  text-white px-2 py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
        >
          Create Project
        </button>
      </div>

      {/* List of Projects */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Projects</h2>
        {loading ? (
          <p className="text-gray-500">Loading projects...</p>
        ) : projects.length > 0 ? (
          <ul className="space-y-4">
            {projects.map((project) => (
              <li key={project.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    <p className="text-sm text-gray-500 mt-2">Access Code: {project.accessCode}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/freelancer/project/${project.id}`)}
                    className="bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-200 transition duration-300"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
