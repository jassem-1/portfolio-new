import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const VideoDetailPage = () => {
  const { projectID, videoID } = useParams();
  const [video, setVideo] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const videoRef = doc(db, `projects/${projectID}/videos/${videoID}`);
        const videoDoc = await getDoc(videoRef);

        if (videoDoc.exists()) {
          const videoData = videoDoc.data();
          setVideo(videoData);
          setAnnotations(videoData.annotations || []);
        } else {
          console.error("Video not found.");
        }
      } catch (err) {
        console.error("Error fetching video details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [projectID, videoID]);

  if (loading) return <p>Loading video details...</p>;

  if (!video) return <p>Video not found.</p>;

  return (
    <div className="p-6 bg-gray-800 text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">{video.name}</h1>
      <p className="mb-4 text-gray-400">Uploaded on: {video.createdAt?.toDate().toLocaleString()}</p>
      <video
        controls
        src={video.url}
        className="w-full mb-6 border border-gray-600 rounded-lg"
      ></video>

      <div className="bg-gray-700 p-4 shadow-md rounded-md">
        <h2 className="text-xl font-semibold mb-4">Annotations</h2>
        {annotations.length > 0 ? (
          <ul>
            {annotations.map((annotation, index) => (
              <li key={index} className="mb-6 border-b border-gray-600 pb-4">
                <img
                  src={annotation.image}
                  alt={`Annotation ${index + 1}`}
                  className="mb-4 border border-gray-600 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold mb-2">Notes:</h3>
                  <ul className="list-disc ml-6">
                    {annotation.notes.map((note, idx) => (
                      <li key={idx} className="text-gray-300">
                        <span style={{ color: note.color }}>{note.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Annotated on: {new Date(annotation.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No annotations found for this video.</p>
        )}
      </div>
    </div>
  );
};

export default VideoDetailPage;
