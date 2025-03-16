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

    // Create an image object
    const img = new Image();
    img.src = image;

    // Wait for the image to load
    img.onload = async () => {
      // Create a temporary canvas to resize the image
      const tempCanvas = document.createElement("canvas");
      const tempCtx = tempCanvas.getContext("2d");

      // Set the temporary canvas size to 28x28
      tempCanvas.width = 28;
      tempCanvas.height = 28;

      // Clear the temporary canvas with a white background
      tempCtx.fillStyle = "white";
      tempCtx.fillRect(0, 0, 28, 28);

      // Draw the image onto the temporary canvas (resize to 28x28)
      tempCtx.drawImage(img, 0, 0, 28, 28);

      // Get the pixel data from the resized image
      const imageData = tempCtx.getImageData(0, 0, 28, 28);
      const data = imageData.data;

      // Convert to grayscale, normalize, and round
      const flattenedImage = [];
      for (let i = 0; i < data.length; i += 4) {
        // Extract RGB values
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Convert to grayscale (using luminance formula)
        const grayscale = 0.299 * r + 0.587 * g + 0.114 * b;

        // Normalize to 0-255, invert, and round to the nearest integer
        const normalized = Math.round(255 - grayscale); // Round to integer
        flattenedImage.push(normalized);
      }

      console.log(flattenedImage); // Log the flattened image for debugging

      // Send the flattened image to the backend
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: flattenedImage }), // Send the flattened image
        });

        if (!response.ok) throw new Error("Prediction failed");
        const data = await response.json();
        setPrediction(data.prediction); // Set the prediction result
      } catch (error) {
        console.error("Error:", error);
        setPrediction("Failed to predict. Please try again.");
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };
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