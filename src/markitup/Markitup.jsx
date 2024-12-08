import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './../firebase';

const Markitup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL; // Correct for Vite

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.email === adminEmail) {
        navigate("/markitup/dashboard"); // Redirect to freelancer dashboard
      } else {
        alert("Access Denied: Only admin can log in here.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
      <h1 className="text-3xl font-bold mb-6">MarkItUp Login</h1>
      <div className="bg-white text-black p-8 shadow-lg rounded-md">
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
      </div>
    </div>
  );
};

export default Markitup;
