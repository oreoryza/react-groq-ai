import React from "react";

const Modal = ({ onClose, onClick }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg mx-4 modal-cstm">
        <h2 className="text-2xl font-bold mb-4">Start New Chat</h2>
        <p>All prompt history will be deleted. Are you sure?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="mt-4 bg-violet-400 px-4 py-2 rounded-md hover:bg-violet-500"
          >
            No
          </button>
          <button
            onClick={onClick}
            className="mt-4 border-2 border-violet-400 px-4 py-2 rounded-md hover:bg-violet-400"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
