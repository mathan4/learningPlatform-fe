import React, { useEffect, useRef } from 'react';

const Modal = ({ onClose, children }) => {
  const modalContentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Effect to stop background scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'; // Disable scrolling on the body
    return () => {
      document.body.style.overflow = 'unset'; // Re-enable scrolling when the component unmounts
    };
  }, []); // Empty dependency array ensures this runs once on mount and once on unmount

  return (
    <div className="fixed inset-0 bg-white bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div
        ref={modalContentRef}
        className="bg-white rounded-lg shadow-xl p-6 relative max-w-lg w-full mx-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-semibold"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;