import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import UndoRedo from "./UndoRedo";
import { RxCross2 } from "react-icons/rx";

function Annotation() {
  const [image, setImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingColor, setDrawingColor] = useState("black");
  const [noteColor, setNoteColor] = useState("black");
  const [currentNote, setCurrentNote] = useState("");
  const [shapes, setShapes] = useState([]);
  const canvasRef = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const imageUrl = params.get("image");

    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        let imgWidth = img.naturalWidth;
        let imgHeight = img.naturalHeight;

        // Scale down if the image exceeds screen dimensions
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;
        if (imgWidth > maxWidth || imgHeight > maxHeight) {
          const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
          imgWidth *= scale;
          imgHeight *= scale;
        }

        setImage(imageUrl);
        setCanvasDimensions({
          width: imgWidth,
          height: imgHeight,
        });
      };
    }
  }, [location.search]);

  const handleToggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  const handleDrawingStop = () => {
    if (!canvasRef.current) return;

    // Save the current canvas state to the undo stack
    const currentState = canvasRef.current.getSaveData();
    setUndoStack([...undoStack, currentState]);
    setRedoStack([]); // Clear redo stack when new actions occur
  };

  const handleUndo = () => {
    if (undoStack.length === 0 || !canvasRef.current) return;

    const lastState = undoStack[undoStack.length - 1];
    const updatedUndoStack = undoStack.slice(0, -1);
    setUndoStack(updatedUndoStack);

    setRedoStack([canvasRef.current.getSaveData(), ...redoStack]); // Save the current state to the redo stack

    if (updatedUndoStack.length > 0) {
      canvasRef.current.loadSaveData(
        updatedUndoStack[updatedUndoStack.length - 1]
      );
    } else {
      canvasRef.current.clear(); // If undo stack is empty, clear the canvas
    }
  };

  const handleRedo = () => {
    if (redoStack.length === 0 || !canvasRef.current) return;

    const nextState = redoStack[0];
    const updatedRedoStack = redoStack.slice(1);
    setRedoStack(updatedRedoStack);

    setUndoStack([...undoStack, canvasRef.current.getSaveData()]); // Save the current state to the undo stack

    canvasRef.current.loadSaveData(nextState);
  };

  const handleDrawingColorChange = (color) => {
    setDrawingColor(color);
  };

  const handleNoteColorChange = (color) => {
    setNoteColor(color);
  };

  const handleSaveNote = () => {
    if (currentNote.trim()) {
      setShapes([...shapes, { note: currentNote, color: noteColor }]);
      setCurrentNote("");
    }
  };

  const handleFinishAndSave = async () => {
    if (canvasRef.current) {
      const combinedCanvas = document.createElement("canvas");
      combinedCanvas.width = canvasDimensions.width;
      combinedCanvas.height = canvasDimensions.height;
      const ctx = combinedCanvas.getContext("2d");

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image; // Use the original image URL for the canvas background
      img.onload = async () => {
        ctx.drawImage(
          img,
          0,
          0,
          canvasDimensions.width,
          canvasDimensions.height
        );

        const drawingCanvas = canvasRef.current.canvasContainer.children[1];
        ctx.drawImage(
          drawingCanvas,
          0,
          0,
          canvasDimensions.width,
          canvasDimensions.height
        );

        try {
          const dataUrl = combinedCanvas.toDataURL();
          const blob = await (await fetch(dataUrl)).blob();

          const formData = new FormData();
          formData.append("file", blob);
          formData.append("upload_preset", "portfolio-projects");
          formData.append("folder", "combined_images");
          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dbhrjqj53/image/upload`,
            formData
          );

          const uploadedImageUrl = response.data.secure_url;
          setModifiedImage(uploadedImageUrl);

          // Get projectID and videoId
          const projectID = new URLSearchParams(location.search).get(
            "projectID"
          );
          const videoId = new URLSearchParams(location.search).get("videoId");

          if (!projectID || !videoId) {
            console.error("Missing projectID or videoId in query parameters.");
            return;
          }

          // Firestore reference
          const videoDocRef = doc(
            db,
            `projects/${projectID}/videos/${videoId}`
          );

          // Update Firestore with the new annotation
          await updateDoc(videoDocRef, {
            annotations: arrayUnion({
              image: uploadedImageUrl,
              notes: shapes,
              timestamp: new Date().toISOString(),
            }),
          });

          console.log("Annotation saved successfully!");

          // Redirect to a blank page with success message
          navigate("/annotation-success");
        } catch (error) {
          console.error(
            "Error uploading to Cloudinary or saving to Firestore:",
            error
          );
        }
      };

      img.onerror = () => {
        console.error("Failed to load the image.");
      };
    }
  };
  const handleDeleteNote = (index) => {
    setShapes(shapes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-[#EFF3EA] flex flex-col items-center justify-center p-4 font-sans">
      <h1 className="text-4xl font-bold text-center text-[#444444] mb-6">
        Click Start and Draw on the Image Below
      </h1>

      <div className="w-full flex 2xl:flex-row flex-col 2xl:items-start items-center gap-x-6  justify-center bg-[#FFFDF0] shadow-lg rounded-lg py-2 px-6">
   
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <button
              onClick={handleToggleDrawing}
              className="px-4 py-2 bg-[#D9DFC6] text-[#444444] font-semibold rounded-lg hover:bg-[#FFF2C2] focus:outline-none focus:ring-2 focus:ring-[#D9DFC6] focus:ring-opacity-50 mr-4"
            >
              {isDrawing ? "Stop Drawing" : "Start Drawing"}
            </button>

            <div className="flex gap-x-2">
              {["black", "red", "blue", "green", "yellow"].map((color) => (
                <div
                  key={color}
                  onClick={() => handleDrawingColorChange(color)}
                  className="w-6 h-6 rounded-full cursor-pointer border-2 border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div
            className="relative mb-6 w-full"
            onClickCapture={handleDrawingStop}
          >
            {image && (
              <CanvasDraw
                ref={canvasRef}
                imgSrc={image}
                brushColor={drawingColor}
                brushRadius={2}
                lazyRadius={0}
                hideGrid={true}
                disabled={!isDrawing}
                className="border-2 border-gray-400 rounded-lg w-full"
                canvasWidth={canvasDimensions.width}
                canvasHeight={canvasDimensions.height}
              />
            )}
          </div>

          <button
            onClick={handleFinishAndSave}
            className="px-4 py-2 bg-[#D9DFC6] text-[#444444] font-semibold rounded-lg hover:bg-[#FFF2C2] focus:outline-none focus:ring-2 focus:ring-[#D9DFC6] focus:ring-opacity-50"
          >
            Finish Annotating and Save
          </button>
          <UndoRedo
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={undoStack.length > 0}
            canRedo={redoStack.length > 0}
          />
        </div>
        <div className="flex flex-col 2xl:w-1/3 w-2/3 justify-center items-start gap-16 p-4">
  <div className="flex flex-col w-full justify-center items-start">
    <h2 className="text-2xl font-semibold mb-4 text-[#444444]">Notes</h2>

    <div className="flex gap-x-2 mb-4">
      {["black", "red", "blue", "green", "yellow"].map((color) => (
        <div
          key={color}
          onClick={() => handleNoteColorChange(color)}
          className={`w-6 h-6 rounded-full cursor-pointer border-2 border-gray-300`}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>

    <textarea
      value={currentNote}
      onChange={(e) => setCurrentNote(e.target.value)}
      placeholder="Add a note"
      className="w-full p-2 text-[#444444] border-2 border-gray-300 rounded-md mb-4 bg-white"
    />

    <button
      onClick={handleSaveNote}
      className="px-4 py-2 bg-[#FFF2C2] text-[#444444] font-semibold rounded-lg hover:bg-[#D9DFC6] focus:outline-none focus:ring-2 focus:ring-[#FFF2C2] focus:ring-opacity-50"
    >
      Add Note
    </button>

    <div className="mt-6 w-full bg-[#EFF3EA] p-2 rounded-xl max-h-96 overflow-auto border-2 border-gray-300 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
    <h3 className="text-xl font-semibold mb-4 text-[#444444]">Saved Notes:</h3>
      <ul className="space-y-4">
        {shapes.map((shape, index) => (
          <li
            key={index}
            className="p-4 border-2 max-w-96 rounded-lg flex flex-col bg-white"
            style={{ borderColor: shape.color }}
          >
            <div
              className="break-words"
              style={{ color: shape.color }}
            >
              <strong>Note {index + 1}: </strong>
              {shape.note}
            </div>
            <button
              onClick={() => handleDeleteNote(index)}
              className="mt-2 text-orange-950 hover:text-red-700 font-bold px-2 self-end"
            >
              <RxCross2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  <div className="w-full max-w-4xl mb-6 p-4 bg-[#FFF2C2] text-[#444444] rounded-lg shadow">
    <h2 className="text-2xl font-semibold mb-2">How to Use</h2>
    <ol className="list-disc pl-6 space-y-4">
  <li className="relative">
    <span className="absolute left-0 top-1/3 transform -translate-x-4 -translate-y-1/2 text-gray-500 text-lg">
      •
    </span>
    Click <strong>Start Drawing</strong> to begin annotating on the image.
  </li>
  <li className="relative">
    <span className="absolute left-0 top-1/3 transform -translate-x-4 -translate-y-1/2 text-gray-500 text-lg">
      •
    </span>
    Use the color palette to select a color for your drawing.
  </li>
  <li className="relative">
    <span className="absolute left-0 top-1/3 transform -translate-x-4 -translate-y-1/2 text-gray-500 text-lg">
      •
    </span>
    Add notes in the notes section, ensuring each note corresponds to its drawing by matching colors.
  </li>
  <li className="relative">
    <span className="absolute left-0 top-1/3 transform -translate-x-4 -translate-y-1/2 text-gray-500 text-lg">
      •
    </span>
    When finished, click <strong>Finish Annotating and Save</strong> to save your annotations.
  </li>
</ol>


  </div>
</div>

       
      </div>

      {modifiedImage && (
        <div className="mt-6 flex">
          <img
            src={modifiedImage}
            alt="Combined Image"
            className="border-2 border-gray-300 rounded-lg"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );

}

export default Annotation;
