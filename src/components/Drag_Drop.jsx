import React, { useState } from "react";

const Drag_Drop = () => {
  const [image, setImage] = useState(null); // Store the uploaded image
  const [prediction, setPrediction] = useState(null); // Store the prediction result
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the image as a data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file input change
  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); // Set the image as a data URL
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Predict the number in the uploaded image
  const predictNumber = async () => {
    if (!image) return;
  
    setIsLoading(true);
  
    try {
      // Send the image to the backend for prediction
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }), // Send the base64 image
      });
  
      if (!response.ok) {
        throw new Error("Prediction failed");
      }
  
      const data = await response.json();
      setPrediction(data.prediction); // Set the prediction result
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Failed to predict. Please try again.");
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Drag & Drop or Upload an Image
      </h1>

      {/* Drag and Drop Area */}
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border-2 border-dashed border-gray-300 text-center cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => document.getElementById("fileInput").click()}
      >
        {image ? (
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-auto rounded-lg"
          />
        ) : (
          <p className="text-gray-600">
            Drag & drop an image here or click to upload.
          </p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
      />

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => setImage(null)}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={predictNumber}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          disabled={!image || isLoading} // Disable if no image or loading
        >
          {isLoading ? "Predicting..." : "Predict"}
        </button>
      </div>

      {/* Prediction Result */}
      {prediction !== null && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Prediction Result</h2>
          <p className="mt-2 text-4xl font-semibold text-blue-600">
            {prediction}
          </p>
        </div>
      )}
    </div>
  );
};

export default Drag_Drop;