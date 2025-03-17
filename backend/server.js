import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT || 3000;
const flaskURL = process.env.VITE_FLASK_URL || 'http://127.0.0.1:5000';

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cors());

// Route to display the server is running
app.get('/', (req, res) => {
  res.send('Numbers Predictor Backend is Running!');
});

// Route to handle prediction requests
app.post('/api/predict', async (req, res) => {
  const { image } = req.body;

  // Validate input data
  if (!image || !Array.isArray(image) || image.length !== 784) {
    return res.status(400).json({
      success: false,
      message: 'Invalid input. Expected a flattened array of 784 pixel values.',
    });
  }

  try {
    // Ensure the input data is in the correct range [0, 255]
    const isValid = image.every((pixel) => pixel >= 0 && pixel <= 255);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pixel values. Expected values in the range [0, 255].',
      });
    }

    // Call the Python backend
    const response = await axios.post(`${flaskURL}/predict`, { image });
    const prediction = response.data.prediction;

    console.log('Received image:', image);
    console.log('Prediction:', prediction);

    res.json({
      success: true,
      message: 'Image received successfully!',
      prediction: prediction,
    });
  } catch (error) {
    console.error('Error during prediction:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during prediction.',
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
