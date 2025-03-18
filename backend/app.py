from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS

app = Flask(__name__)

# ✅ Configure CORS to allow requests from your frontend
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://numbers-predictor.vercel.app", "http://localhost:5173"],
        "methods": ["POST", "OPTIONS"],  # Allow POST and OPTIONS requests
        "allow_headers": ["Content-Type"]
    }
})

# Load the model
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_mlp_model.pkl")

# Safely load the model with error handling
try:
    model = joblib.load(MODEL_PATH)
except Exception as e:
    print(f"Error loading the model: {e}")
    model = None

@app.route("/", methods=["GET"])
def home():
    return "Flask Backend is Running!"

@app.route("/api/predict", methods=["OPTIONS"])
def handle_options():
    """Handle preflight OPTIONS requests for CORS."""
    return jsonify({"message": "Preflight request handled"}), 200

@app.route("/api/predict", methods=["POST"])
def predict():
    """Handle prediction requests."""
    try:
        # Check if the model is loaded
        if model is None:
            return jsonify({"error": "Model not loaded. Please check the server logs."}), 500

        # Validate the request data
        data = request.get_json()
        if not data or "image" not in data:
            return jsonify({"error": "Invalid input. 'image' field is required."}), 400

        image = data["image"]
        if not isinstance(image, list) or len(image) != 784:
            return jsonify({"error": "Invalid input. Expected a flattened array of 784 pixel values."}), 400

        # Perform the prediction
        prediction = model.predict([image])
        return jsonify({"prediction": int(prediction[0])})

    except Exception as e:
        # Log the error for debugging
        print(f"Error during prediction: {e}")
        return jsonify({"error": "An internal server error occurred. Please try again later."}), 500

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 5000))  # Default port 5000, but configurable
    app.run(host="0.0.0.0", port=PORT)