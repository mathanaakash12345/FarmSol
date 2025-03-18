import React, { useEffect, useState } from "react";

const Toast = ({ message, type, showToast, setShowToast }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (showToast) {
      setProgress(100);
      const interval = setInterval(() => {
        setProgress((oldProgress) => Math.max(oldProgress - 2, 0)); 
      }, 60);

      const timer = setTimeout(() => {
        setShowToast(false);
        clearInterval(interval);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
      };
    }
  }, [showToast, setShowToast]);

  const toastStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    showToast && (
      <div className="fixed top-5 p-6 right-5 z-50 flex flex-col items-end">
        {/* Toast message */}
        <div
          className={`${toastStyles[type]} px-4 py-2 rounded-lg shadow-lg text-xl text-center transition-opacity duration-500 ease-in-out`}
        >
          {message}
        </div>

        {/* Loading bar animation */}
        <div className="w-full h-1 bg-gray-300 rounded-lg mt-2 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    )
  );
};

export default Toast;
