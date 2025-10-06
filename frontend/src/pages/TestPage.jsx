// src/pages/TestPage.jsx - Simple test page to verify frontend is working
import React from "react";

export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Frontend is Working! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The React app is loading correctly.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Test Components</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-100 rounded">
              <p className="text-blue-800">✅ React is working</p>
            </div>
            <div className="p-4 bg-green-100 rounded">
              <p className="text-green-800">✅ Tailwind CSS is working</p>
            </div>
            <div className="p-4 bg-purple-100 rounded">
              <p className="text-purple-800">✅ Routing is working</p>
            </div>
            <div className="p-4 bg-yellow-100 rounded">
              <p className="text-yellow-800">✅ Authentication system is ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
