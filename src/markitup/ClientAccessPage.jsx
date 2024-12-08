import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const ClientAccessPage = () => {
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAccess = async () => {
    setError(""); // Clear previous errors
    try {
      // Query Firestore for the project with the given access code
      const q = query(collection(db, "projects"), where("accessCode", "==", accessCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const projectDoc = querySnapshot.docs[0];
        const projectID = projectDoc.id; // Get the project ID
        navigate(`/project/${projectID}`); // Redirect to the project page
      } else {
        setError("Invalid access code. Please try again.");
      }
    } catch (err) {
      console.error("Error accessing project:", err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <h1 className="text-3xl font-bold mb-6">Access Your Project</h1>
      <div className="bg-white text-black p-6 shadow-md rounded-md">
        <input
          type="text"
          placeholder="Enter Access Code"
          value={accessCode}
          onChange={(e) => setAccessCode(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAccess}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Access Project
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default ClientAccessPage;
