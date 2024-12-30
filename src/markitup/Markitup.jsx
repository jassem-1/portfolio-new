import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "./../firebase";

const AccessPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [loginError, setLoginError] = useState("");
  const [accessError, setAccessError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === adminEmail) {
        navigate("/markitup/dashboard"); // Redirect to admin dashboard
      } else {
        alert("Access Denied: Only admin can log in here.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  const handleAccess = async () => {
    setAccessError(""); // Clear previous errors
    try {
      const q = query(collection(db, "projects"), where("accessCode", "==", accessCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const projectDoc = querySnapshot.docs[0];
        const projectID = projectDoc.id;
        navigate(`/project/${projectID}`); // Redirect to the project page
      } else {
        setAccessError("Invalid access code. Please try again.");
      }
    } catch (err) {
      console.error("Error accessing project:", err);
      setAccessError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-500">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Admin Login Form */}
        <div className="bg-white text-black p-8 shadow-md rounded-md w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
          >
            Login
          </button>
          {loginError && <p className="text-red-500 mt-4">{loginError}</p>}
        </div>

        {/* Client Access Form */}
        <div className="bg-white text-black p-8 shadow-md rounded-md w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Client Access</h2>
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
          {accessError && <p className="text-red-500 mt-4">{accessError}</p>}
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
