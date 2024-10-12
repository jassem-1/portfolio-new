import React from "react";

interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  children: React.ReactNode;
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onRequestClose, title, children }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-2 transition-transform transform duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onRequestClose} className="text-gray-600 scale-110 hover:text-gray-800">
            &times;
          </button>
        </div>
        <div>{children}</div>
     
      </div>
    </div>
  );
};

export default CustomModal;
