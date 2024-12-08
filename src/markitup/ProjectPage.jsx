import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ProjectPage = () => {
  const { projectID } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [videos, setVideos] = useState([]); // State to store video list
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch project details
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

  // Fetch videos for the project
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videosRef = collection(db, `projects/${projectID}/videos`);
        const videosSnapshot = await getDocs(videosRef);

        const videoList = videosSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setVideos(videoList);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      }
    };

    if (project) {
      fetchVideos();
    }
  }, [project, projectID]);

  if (loading) return <p className="text-center text-lg text-gray-700">Loading project...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        {/* Project Header */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
          <p className="text-lg mb-4">{project.description}</p>
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              <span className="font-semibold">Access Code:</span> {project.accessCode}
            </p>
            <p>
              <span className="font-semibold">Created At:</span>{" "}
              {project.createdAt?.toDate().toLocaleString()}
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                >
                  <h3 className="text-lg font-semibold truncate">{video.name}</h3>
                  <a
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-blue-400 hover:text-blue-300 underline"
                  >
                    Watch Video
                  </a>
                  <p className="mt-2 text-sm text-gray-400">
                    Uploaded on: {new Date(video.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No videos have been uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
