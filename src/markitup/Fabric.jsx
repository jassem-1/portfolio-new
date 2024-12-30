import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import  fabric  from "fabric";

const FabricCanvas = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("PEN"); // Default tool: Pen

  // Initialize the Fabric.js canvas
  useEffect(() => {
    const canvas = new fabric.Canvas("fabric-canvas", {
      isDrawingMode: false, // Start with drawing mode disabled
    });
    canvasRef.current = canvas;

    // Load the image onto the canvas
    if (imageUrl) {
      fabric.Image.fromURL(imageUrl, (img) => {
        img.set({
          left: canvas.width / 2 - img.width / 2,
          top: canvas.height / 2 - img.height / 2,
          selectable: false, // Disable selection for the base image
        });
        canvas.add(img);
        canvas.sendToBack(img);
      });
    }

    // Cleanup on component unmount
    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  // Switch tools
  useEffect(() => {
    if (canvasRef.current) {
      if (tool === "PEN") {
        canvasRef.current.isDrawingMode = true; // Enable free drawing
        canvasRef.current.freeDrawingBrush.color = "black";
        canvasRef.current.freeDrawingBrush.width = 5;
      } else {
        canvasRef.current.isDrawingMode = false; // Disable free drawing for other tools
      }
    }
  }, [tool]);

  // Add text to the canvas
  const addText = (event) => {
    if (tool === "TEXT") {
      const pointer = canvasRef.current.getPointer(event.e);
      const text = new fabric.Textbox("Type here", {
        left: pointer.x,
        top: pointer.y,
        fontSize: 20,
        fill: "black",
        editable: true,
        selectable: true,
      });
      canvasRef.current.add(text);
    }
  };

  // Attach mouse down event for adding text
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;

      // Add event listener only for the text tool
      if (tool === "TEXT") {
        canvas.on("mouse:down", addText);
      } else {
        canvas.off("mouse:down", addText);
      }

      return () => {
        canvas.off("mouse:down", addText); // Cleanup
      };
    }
  }, [tool]);

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setTool("PEN")}
          className={`px-4 py-2 mr-2 rounded ${
            tool === "PEN" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Pen Tool
        </button>
        <button
          onClick={() => setTool("TEXT")}
          className={`px-4 py-2 rounded ${
            tool === "TEXT" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Text Tool
        </button>
      </div>
      <canvas id="fabric-canvas" width={800} height={600} className="border" />
    </div>
  );
};
FabricCanvas.propTypes = {
  imageUrl: PropTypes.string,
};

export default FabricCanvas;
