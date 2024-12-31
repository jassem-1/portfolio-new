import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import axios from "axios";

const ProjectPage = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState(null);
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCaptureButton, setShowCaptureButton] = useState(false);
  const [capturedScreenshots, setCapturedScreenshots] = useState([]);
  const videoPlayerRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
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

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    if (project) fetchVideos();
  }, [project]);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setCapturedScreenshots([]);
    setShowCaptureButton(false);
  };

  const handleVideoPause = () => {
    setShowCaptureButton(true);
  };

  const captureScreenshot = async () => {
    if (!videoPlayerRef.current) return;

    const video = videoPlayerRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const screenshot = canvas.toDataURL("image/png");

    try {
      const blob = await (await fetch(screenshot)).blob();

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "portfolio-projects");
      formData.append("folder", "project_screenshots");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dbhrjqj53/image/upload`,
        formData
      );

      const uploadedImageUrl = response.data.secure_url;

      setCapturedScreenshots((prev) => [...prev, uploadedImageUrl]);
      setShowCaptureButton(false);
    } catch (err) {
      console.error("Error uploading screenshot to Cloudinary:", err);
    }
  };

  const handleAnnotate = (image) => {
    if (!selectedVideo) {
      console.error("No video selected for annotation.");
      return;
    }

    const videoId = selectedVideo.id;

    if (!projectID) {
      console.error("No projectID available.");
      return;
    }

    window.open(
      `/annotate?image=${encodeURIComponent(
        image
      )}&videoId=${encodeURIComponent(videoId)}&projectID=${encodeURIComponent(
        projectID
      )}`,
      "_blank"
    );
  };

  if (loading)
    return (
      <p className="text-center text-lg text-gray-700">Loading project...</p>
    );
  if (!project)
    return <p className="text-center text-red-500">Project not found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-4">{project.name}</h1>
          <p className="text-lg mb-4">{project.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Uploaded Videos</h2>
          {videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
                  onClick={() => handleVideoSelect(video)}
                >
                  <h3 className="text-lg font-semibold truncate">
                    {video.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Uploaded on: {" "}
                    {new Date(video.createdAt.seconds * 1000).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No videos have been uploaded yet.</p>
          )}
        </div>

        {selectedVideo && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              Playing: {selectedVideo.name}
            </h2>
            <video
              ref={videoPlayerRef}
              src={selectedVideo.url}
              controls
              crossOrigin="anonymous"
              className="w-full border border-gray-300 rounded"
              onPause={handleVideoPause}
            ></video>

            {showCaptureButton && (
              <button
                onClick={captureScreenshot}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition duration-300"
              >
                Capture and Note
              </button>
            )}

            <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

            {capturedScreenshots.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Captured Screenshots</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {capturedScreenshots.map((screenshot, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="border border-gray-300 rounded w-full"
                      />
                      <button
                        onClick={() => handleAnnotate(screenshot)}
                        className="bg-yellow-500 text-white px-4 py-2 rounded mt-2 hover:bg-yellow-600 transition duration-300"
                      >
                        Annotate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPage;
