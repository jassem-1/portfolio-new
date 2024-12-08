import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const FreelancerProjectPage = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const [videos, setVideos] = useState([]);
  const [videoName, setVideoName] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dbhrjqj53/upload";
  const UPLOAD_PRESET = "portfolio-projects";

  // Fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRef = doc(db, "projects", projectID);
        const projectDoc = await getDoc(projectRef);

        if (projectDoc.exists()) {
          setProject(projectDoc.data());
        } else {
          console.error("Project not found.");
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectID]);

  // Fetch videos for this project
  const fetchVideos = async () => {
    try {
      const videosRef = collection(db, `projects/${projectID}/videos`);
      const querySnapshot = await getDocs(videosRef);
      const videoList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setVideos(videoList);
    } catch (err) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    if (project) fetchVideos();
  }, [project]);

  // Upload video to Cloudinary
  const uploadVideo = async () => {
    if (!videoName.trim() || !file) {
      alert("Please provide a video name and select a file.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        const response = await axios.post(CLOUDINARY_URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data", // Ensures the request is correctly formatted
            },
          });
      
          const videoURL = response.data.secure_url;

      // Save the video URL and metadata in Firestore
      const videosRef = collection(db, `projects/${projectID}/videos`);
      await addDoc(videosRef, {
        name: videoName,
        url: videoURL,
        createdAt: new Date(),
      });

      alert("Video uploaded successfully!");
      setVideoName("");
      setFile(null);
      fetchVideos();
    } catch (err) {
      console.error("Error uploading video to Cloudinary:", err);
      setError("Failed to upload video. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p>Loading project...</p>;

  return (
    <div className="p-6 bg-gray-400 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{project?.name}</h1>
      <p className="mb-4">{project?.description}</p>

      {/* Upload Video Form */}
      <div className="bg-white p-4 shadow-md rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Video</h2>
        <input
          type="text"
          placeholder="Video Name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="w-full text-black mb-4 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          accept="video/*"
        />
        <button
          onClick={uploadVideo}
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>

        {uploading && <p>Uploading video...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* List of Videos */}
      <div className="bg-gray-400 p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Uploaded Videos</h2>
        {videos.length > 0 ? (
          <ul>
            {videos.map((video) => (
              <li key={video.id} className="mb-4">
                <h3 className="text-lg font-bold">{video.name}</h3>
                <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  Watch Video
                </a>
                <p className="text-sm text-gray-500">
                  Uploaded on: {video.createdAt?.toDate().toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerProjectPage;
