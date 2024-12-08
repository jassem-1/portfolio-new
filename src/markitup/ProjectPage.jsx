import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

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

  const captureScreenshot = () => {
    if (!videoPlayerRef.current) return;

    const video = videoPlayerRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const screenshot = canvas.toDataURL("image/png");
      setCapturedScreenshots((prev) => [...prev, screenshot]);
      setShowCaptureButton(false);
    } catch (err) {
      console.error("Error capturing screenshot:", err);
      alert("Failed to capture screenshot. Ensure the video source supports CORS.");
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-700">Loading project...</p>;
  if (!project) return <p className="text-center text-red-500">Project not found.</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
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
                  className="bg-gray-700 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => handleVideoSelect(video)}
                >
                  <h3 className="text-lg font-semibold truncate">{video.name}</h3>
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

        {selectedVideo && (
          <div className="mt-8 bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Playing: {selectedVideo.name}</h2>
            <video
              ref={videoPlayerRef}
              src={selectedVideo.url}
              controls
              crossOrigin="anonymous" // Enable CORS for the video
              className="w-full border border-gray-500 rounded"
              onPause={handleVideoPause}
            ></video>

            {showCaptureButton && (
              <button
                onClick={captureScreenshot}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
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
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="border border-gray-500 rounded w-full"
                    />
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
