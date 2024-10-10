import { motion } from "framer-motion";
import React from "react";
import "./hero.css"; // Import the CSS for the animation

function NeonButton() {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="text-center mt-6 w-40 h-12 border-2 relative rounded-full neon-button"
        animate={{
          scale: [1, 1.1, 1], // Scale up and back to original size
        }}
        transition={{
          duration: 1, // Time for one cycle of the animation
          repeat: Infinity, // Repeat the animation infinitely
          repeatType: "loop", // Make it loop continuously
          ease: "easeInOut", // Smooth easing for the scale
        }}
      >
        {/* Neon Ball */}
        <div className="neon-ball"></div>

        {/* Button Text */}
        <button className="text-gray-400 text-base py-1 px-3 rounded-full relative z-10">
          resume
        </button>
      </motion.div>
    </div>
  );
}

export default NeonButton;
