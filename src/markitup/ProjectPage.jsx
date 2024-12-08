import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ProjectPage = () => {
  const { projectID } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const projectRef = doc(db, "projects", projectID);
        const projectDoc = await getDoc(projectRef);

        if (projectDoc.exists()) {
          setProject(projectDoc.data());
        } else {
          setError("Project not found.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectID]);

  if (loading) return <p>Loading project...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-500 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
      <p className="mb-4">{project.description}</p>
      <p className="text-gray-600 text-sm">Access Code: {project.accessCode}</p>
      <p className="text-gray-600 text-sm">Created At: {project.createdAt?.toDate().toLocaleString()}</p>
      <div className="mt-6">
        <h2 className="text-xl font-bold">Videos</h2>
        <p>(Video list will be implemented here.)</p>
      </div>
    </div>
  );
};

export default ProjectPage;
