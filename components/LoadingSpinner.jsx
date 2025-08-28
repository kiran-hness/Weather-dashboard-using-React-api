// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ isDarkMode }) => (
  <div className="flex justify-center items-center py-12">
    <div className="relative">
  <div className={`w-16 h-16 border-4 border-solid rounded-full animate-spin ${
      isDarkMode ? 'border-gray-600 border-t-gray-300' : 'border-gray-300 border-t-blue-500'
    }`}></div>
</div>

    <span className={`ml-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
      Loading weather data...
    </span>
  </div>
);

export default LoadingSpinner;