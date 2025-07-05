import React from "react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 animate-fade-in">
      <div className="relative flex items-center justify-center mb-6">
        <span className="absolute inline-flex h-16 w-16 rounded-full bg-purple-300 opacity-75 animate-ping"></span>
        <span className="relative inline-flex rounded-full h-16 w-16 bg-purple-600 flex items-center justify-center">
          <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v4m0 8v4m8-8h-4M4 12H0m16.24-7.76l-2.83 2.83M7.76 16.24l-2.83 2.83m12.02 0l-2.83-2.83M7.76 7.76L4.93 4.93" />
          </svg>
        </span>
      </div>
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Loading products...</h2>
      <p className="text-gray-600">Please wait while we fetch the best deals for you.</p>
    </div>
  );
}
