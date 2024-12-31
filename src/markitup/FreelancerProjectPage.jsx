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
      const videoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
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
          "Content-Type": "multipart/form-data",
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">{project?.name}</h1>
      <p className="text-lg text-gray-600 mb-8">{project?.description}</p>

      {/* Upload Video Form */}
      <div className="bg-white p-6 shadow-lg rounded-lg mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upload Video</h2>
        <input
          type="text"
          placeholder="Video Name"
          value={videoName}
          onChange={(e) => setVideoName(e.target.value)}
          className="w-full mb-4 p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          accept="video/*"
        />
        <button
          onClick={uploadVideo}
          className=" bg-blue-500 text-white px-3 py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
        {uploading && <p className="text-blue-500 mt-4">Uploading video...</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>

      {/* List of Videos */}
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Uploaded Videos</h2>
        {videos.length > 0 ? (
          <ul className="space-y-4">
            {videos.map((video) => (
              <li key={video.id} className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{video.name}</h3>
                <a
  href={`/projects/${projectID}/videos/${video.id}`}
  className="bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-300 inline-block"
>
  View Details
</a>
                <p className="text-sm text-gray-500 mt-2">
                  Uploaded on: {new Date(video.createdAt.seconds * 1000).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No videos uploaded yet.</p>
        )}
      </div>
    </div>
  );
};

export default FreelancerProjectPage;
