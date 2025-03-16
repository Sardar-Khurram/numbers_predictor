import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 m-8 rounded-2xl sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to the AI-Powered Numbers Predictor
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          Predict numerical patterns with ease using our advanced AI algorithms.
          Choose one of the methods below to get started.
        </p>
      </div>

      {/* Methods Section */}
      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Editor Method */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="/img1.jpg"
            alt="Editor Method"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Editor</h2>
            <p className="mt-2 text-gray-600">
              Use our powerful text editor to input and analyze numerical data.
              Perfect for manual data entry and quick predictions.
            </p>
            <Link
              to="/editor"
              className="mt-4 inline-block bg-gray-950 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Try Editor
            </Link>
          </div>
        </div>

        {/* Drag & Drop Method */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="/img2.jpg"
            alt="Drag & Drop Method"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Drag & Drop</h2>
            <p className="mt-2 text-gray-600">
              Simply drag and drop your files to analyze numerical data. Fast,
              intuitive, and hassle-free.
            </p>
            <Link
              to="/drag-drop"
              className="mt-4 inline-block bg-gray-950 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Try Drag & Drop
            </Link>
          </div>
        </div>

        {/* Upload Method */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src="/img3.jpg"
            alt="Upload Method"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload</h2>
            <p className="mt-2 text-gray-600">
              Upload your files directly and let our AI handle the rest. Supports
              multiple file formats for your convenience.
            </p>
            <Link
              to="/upload"
              className="mt-4 inline-block bg-gray-950 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
            >
              Try Upload
            </Link>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900">
          Ready to Get Started?
        </h2>
        <p className="mt-4 text-gray-600">
          Choose a method above or explore our features to see how our AI can help
          you predict numerical patterns with ease.
        </p>
      </div>
    </div>
  );
};

export default Home;