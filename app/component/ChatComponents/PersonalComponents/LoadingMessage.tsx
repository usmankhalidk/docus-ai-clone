import React from 'react';

const LoadingMessage = () => {
  return (
    <div className="flex items-center space-x-2 p-4">
      <div className="w-8 h-8 bg-teal-100 rounded-full animate-pulse" />
      <div className="space-y-2">
        <div className="w-64 h-4 bg-gray-100 rounded animate-pulse" />
        <div className="w-48 h-4 bg-gray-100 rounded animate-pulse" />
      </div>
    </div>
  );
};
export default LoadingMessage;