import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FabricCanvas from "./Fabric";

const AnnotationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const imageUrl = state?.screenshot;

  // Redirect back if no image is provided
  useEffect(() => {
    if (!imageUrl) {
      navigate(-1);
    }
  }, [imageUrl, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Annotation Tool</h1>
      <FabricCanvas imageUrl={imageUrl} />
      <div className="mt-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Back to Project
        </button>
      </div>
    </div>
  );
};

export default AnnotationPage;
