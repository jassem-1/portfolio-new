import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Annotation from "./Annotation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AnnotationPage = () => {
  const { projectID } = useParams();
  const { state } = useLocation(); // Access the passed screenshot
  const screenshot = state?.screenshot;

  if (!screenshot) return <p>No screenshot selected for annotation.</p>;

  // Save the annotated image (you can reuse your Cloudinary and Firestore logic here)
  const saveAnnotatedImage = async (annotatedImageData) => {
    const { image, notes, timestamp } = annotatedImageData;
  
    try {
      // Upload the image to Cloudinary
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "portfolio-projects"); // Replace with your Cloudinary preset
      const response = await fetch("https://api.cloudinary.com/v1_1/dbhrjqj53/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      const imageUrl = data.secure_url; // Get Cloudinary URL
  
      // Save metadata and Cloudinary URL to Firestore
      await addDoc(collection(db, `projects/${projectID}/annotations`), {
        imageUrl, // Save Cloudinary URL
        notes,    // Save notes
        timestamp,
        projectID,
      });
  
      console.log("Annotated image and metadata saved successfully.");
    } catch (error) {
      console.error("Error saving annotated image:", error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">Annotate Screenshot</h1>
      <Annotation initialImage={screenshot} onSave={saveAnnotatedImage} />
    </div>
  );
};

export default AnnotationPage;
