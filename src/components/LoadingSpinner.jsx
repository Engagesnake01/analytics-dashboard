import React from 'react';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="flex items-center space-x-2">
      <div className="loading-spinner"></div>
      <span className="text-gray-600 font-medium">Loading dashboard...</span>
    </div>
  </div>
);

export default LoadingSpinner;