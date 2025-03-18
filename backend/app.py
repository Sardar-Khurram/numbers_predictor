from flask import Flask, request, jsonify
import joblib
import os
from flask_cors import CORS  # To allow frontend requests

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Load the model (relative path inside backend folder)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_mlp_model.pkl")
model = joblib.load(MODEL_PATH)

@app.route("/", methods=["GET"])
def home():
    return "Flask Backend is Running!"

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.json
        if "image" not in data or not isinstance(data["image"], list) or len(data["image"]) != 784:
            return jsonify({"error": "Invalid input. Expected a flattened array of 784 pixel values."}), 400

        image = data["image"]
        prediction = model.predict([image])
        return jsonify({"prediction": int(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    PORT = int(os.getenv("PORT", 5000))  # Default port 5000, but configurable
    app.run(host="0.0.0.0", port=PORT)
