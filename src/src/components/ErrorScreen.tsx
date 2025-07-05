import React from "react";

interface ErrorScreenProps {
  message: string;
}

export default function ErrorScreen({ message }: ErrorScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 animate-fade-in">
      <div className="mb-6">
        <svg className="w-20 h-20 text-red-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#fee2e2" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-700 mb-4 text-center max-w-md">{message}</p>
      <a href="/" className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition">Back to Home</a>
    </div>
  );
}
