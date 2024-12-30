import React from "react";
import PropTypes from "prop-types";

const UndoRedo = ({ onUndo, onRedo, canUndo, canRedo }) => {
  return (
    <div className="flex gap-x-4 mt-4">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={`px-4 py-2 rounded-lg ${
          canUndo ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
        } text-white`}
      >
        Undo
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={`px-4 py-2 rounded-lg ${
          canRedo ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        } text-white`}
      >
        Redo
      </button>
    </div>
  );
};
UndoRedo.propTypes = {
  onUndo: PropTypes.func.isRequired,
  onRedo: PropTypes.func.isRequired,
  canUndo: PropTypes.bool.isRequired,
  canRedo: PropTypes.bool.isRequired,
};

export default UndoRedo;
