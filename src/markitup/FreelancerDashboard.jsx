import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Freelancer Dashboard</h1>

      {/* Create New Project Form */}
      <div className="bg-gray-500 p-4 shadow-md rounded-md mb-6">
        <h2 className="text-xl text-black font-semibold mb-4">Create New Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="w-full text-black  mb-4 p-2 border border-gray-300 rounded-md"
        />
        <textarea
          placeholder="Project Description"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
          className="w-full text-black  mb-4 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={createProject}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Create Project
        </button>
      </div>

      {/* List of Projects */}
      <div className="bg-gray-400 p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Projects</h2>
        {loading ? (
          <p>Loading projects...</p>
        ) : projects.length > 0 ? (
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p>{project.description}</p>
                    <p className="text-sm text-gray-500">
                      Access Code: {project.accessCode}
                    </p>
                  </div>
                  <button
                    onClick={() => console.log("Navigate to project details")}
                    className="bg-gray-200 text-gray-800 py-1 px-3 rounded-md"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerDashboard;
