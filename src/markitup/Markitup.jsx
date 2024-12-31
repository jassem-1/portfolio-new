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
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isAccessLoading, setIsAccessLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    setIsLoginLoading(true);
    setLoginError(""); // Clear previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === adminEmail) {
        window.open("/markitup/dashboard", '_blank');

      } else {
        alert("Access Denied: Only admin can log in here.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Login failed. Please check your credentials.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleAccess = async () => {
    setIsAccessLoading(true);
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
    } finally {
      setIsAccessLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Admin Login Form */}
        <div className="bg-white text-gray-800 p-8 shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-6">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleLogin}
            disabled={isLoginLoading}
            className={`w-full px-2 py-3 rounded-lg font-medium transition duration-300 ${
              isLoginLoading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isLoginLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-3.362 3.363A9.953 9.953 0 014 12H0c0 2.347.805 4.513 2.137 6.242L6 17.291z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Login"
            )}
          </button>
          {loginError && <p className="text-red-500 mt-4 text-sm text-center">{loginError}</p>}
        </div>

        {/* Client Access Form */}
        <div className="bg-white text-gray-800 p-8 shadow-lg rounded-xl border border-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-6">Client Access</h2>
          <input
            type="text"
            placeholder="Enter Access Code"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            onClick={handleAccess}
            disabled={isAccessLoading}
            className={`w-full px-2 py-3 rounded-lg font-medium transition duration-300 ${
              isAccessLoading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isAccessLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-3.362 3.363A9.953 9.953 0 014 12H0c0 2.347.805 4.513 2.137 6.242L6 17.291z"
                  ></path>
                </svg>
              </div>
            ) : (
              "Access Project"
            )}
          </button>
          {accessError && <p className="text-red-500 mt-4 text-sm text-center">{accessError}</p>}
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
