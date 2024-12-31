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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className="text-lg animate-pulse">Loading video details...</p>
      </div>
    );

  if (!video)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 text-gray-700">
        <p className="text-lg">Video not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 montserrat-font ">
      <div className="w-full mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-teal-700 mb-6">
          {video.name}
        </h1>
        <p className="mb-4 text-gray-600">
          Uploaded on:{" "}
          <span className="text-gray-500">
            {video.createdAt?.toDate().toLocaleString()}
          </span>
        </p>
    
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-teal-700 mb-4">
            Annotations
          </h2>
          {annotations.length > 0 ? (
            <ul className=" grid grid-cols-1 sm:grid-cols-2 gap-4">

              {annotations.map((annotation, index) => (
                <li
                  key={index}
                  className="flex flex-col h-[700px] p-4 bg-gray-100 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-300 overflow-hidden"
                  >
                  {annotation.image && (
                    <img
                      src={annotation.image}
                      alt={`Annotation ${index + 1}`}
                      className="mb-4 w-full rounded-lg border border-gray-200"
                    />
                  )}
           <div className="flex-1 overflow-y-auto">
            <h3 className="font-semibold text-2xl text-gray-800 mb-2">Notes :</h3>
            <ul className="list-disc ml-6 space-y-2">
              {annotation.notes.map((note, idx) => (
                <li key={idx} className="text-gray-600 text-xl">
                  <span
                    className="font-medium bg-gray-300"
                    style={{ color: note.color }}
                  >
                    {note.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
                  <p className="text-sm text-gray-500 mt-4">
                    Annotated on:{" "}
                    <span>
                      {new Date(annotation.timestamp).toLocaleString()}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No annotations found for this video.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;
