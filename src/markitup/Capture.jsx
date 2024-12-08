import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { SketchField, Tools } from "react-sketch";

const VideoFeedback = ({ videoUrl }) => {
  const playerRef = useRef(null); // Ref for the video player
  const canvasRef = useRef(null); // Ref for the canvas
  const [feedbacks, setFeedbacks] = useState([]);
  const [showAnnotationTools, setShowAnnotationTools] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(null);
  const [currentNote, setCurrentNote] = useState("");

  // Capture Screenshot
  const captureScreenshot = () => {
    const videoElement = playerRef.current.getInternalPlayer();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    // Draw the current video frame onto the canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Save the screenshot data URL
    const screenshot = canvas.toDataURL("image/png");
    setCurrentScreenshot(screenshot);
    setShowAnnotationTools(true);
  };

  // Save Feedback
  const saveFeedback = () => {
    setFeedbacks((prevFeedbacks) => [
      ...prevFeedbacks,
      { screenshot: currentScreenshot, note: currentNote },
    ]);
    setShowAnnotationTools(false);
    setCurrentScreenshot(null);
    setCurrentNote("");
  };

  return (
    <div className="p-6 bg-gray-900 text-white">
      {/* Video Player */}
      <div className="mb-4">
        <ReactPlayer
          url={videoUrl}
          controls
          ref={playerRef}
          onPause={captureScreenshot} // Capture screenshot on pause
          className="react-player"
          width="100%"
          height="auto"
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>

      {/* Annotation Tools */}
      {showAnnotationTools && (
        <div className="annotation-tools bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Annotate and Give Feedback</h3>
          {currentScreenshot && (
            <div className="mb-4">
              <img
                src={currentScreenshot}
                alt="Screenshot"
                className="w-full rounded-lg shadow"
              />
            </div>
          )}

          <SketchField
            width="100%"
            height="300px"
            tool={Tools.Pencil}
            lineColor="red"
            lineWidth={3}
          />

          <textarea
            className="w-full p-2 mt-4 rounded-lg bg-gray-700 text-white"
            rows="3"
            placeholder="Add your note here..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
          ></textarea>

          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={saveFeedback}
          >
            Save Feedback
          </button>
        </div>
      )}

      {/* Feedback List */}
      {feedbacks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Feedbacks</h3>
          <ul className="space-y-4">
            {feedbacks.map((feedback, index) => (
              <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
                <img
                  src={feedback.screenshot}
                  alt={`Feedback ${index + 1}`}
                  className="mb-4 rounded-lg shadow"
                />
                <p>{feedback.note}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoFeedback;
