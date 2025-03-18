import React, { useRef, useState } from "react";

const Editor = () => {
  const canvasRef = useRef(null); // Reference to the canvas element
  const [isDrawing, setIsDrawing] = useState(false); // Track drawing state
  const [prediction, setPrediction] = useState(null); // Store prediction result
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  // Start drawing (for mouse events)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent; // Get mouse position
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Start drawing (for touch events)
  const startDrawingTouch = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const touch = e.touches[0]; // Get the first touch
    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const offsetX = touch.clientX - rect.left; // Calculate touch X position
    const offsetY = touch.clientY - rect.top; // Calculate touch Y position
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Draw on mouse move
  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent; // Get mouse position
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = "#000000"; // Black color for drawing
    ctx.lineWidth = 10; // Thickness of the drawing
    ctx.stroke();
  };

  // Draw on touch move
  const drawTouch = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const touch = e.touches[0]; // Get the first touch
    const rect = canvas.getBoundingClientRect(); // Get canvas position
    const offsetX = touch.clientX - rect.left; // Calculate touch X position
    const offsetY = touch.clientY - rect.top; // Calculate touch Y position
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = "#000000"; // Black color for drawing
    ctx.lineWidth = 10; // Thickness of the drawing
    ctx.stroke();
  };

  // Stop drawing
  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.closePath();
    setIsDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPrediction(null); // Reset prediction result
  };

  // Predict the drawn number
  const predictNumber = async () => {
    const canvas = canvasRef.current;
  
    // Step 1: Get the canvas image as a base64 string
    const image = canvas.toDataURL("image/png");
  
    // Step 2: Create an image object
    const img = new Image();
    img.src = image;
  
    // Wait for the image to load
    img.onload = async () => {
      // Step 3: Create a temporary canvas to resize the image
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
  
      // Step 4: Get the pixel data from the resized image
      const imageData = tempCtx.getImageData(0, 0, 28, 28);
      const data = imageData.data;
  
      // Step 5: Convert to grayscale, normalize, and round
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
  
      console.log("Flattened image length:", flattenedImage.length); // Debugging
      console.log("Flattened image:", flattenedImage); // Debugging
  
      // Step 6: Send the flattened image to the backend
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: flattenedImage }), // Send the flattened image
        });
  
        console.log("Response status:", response.status); // Debugging
        console.log("Response headers:", response.headers); // Debugging
  
        if (!response.ok) throw new Error("Prediction failed");
        const data = await response.json();
        console.log("Prediction data:", data); // Debugging
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
        Draw a Number
      </h1>

      {/* Canvas */}
      <div className="bg-white rounded-lg shadow-lg p-4">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border-2 border-gray-300 rounded-lg"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawingTouch}
          onTouchMove={drawTouch}
          onTouchEnd={stopDrawing}
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={clearCanvas}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Clear
        </button>
        <button
          onClick={predictNumber}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          disabled={isLoading} // Disable button while loading
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

export default Editor;