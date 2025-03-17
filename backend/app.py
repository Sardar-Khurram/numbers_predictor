from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load the model (relative path inside backend folder)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_mlp_model.pkl")
model = joblib.load(MODEL_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    if "image" not in data:
        return jsonify({"error": "Missing 'image' in request body"}), 400
    
    image = data["image"]  # Expecting a flattened array of 784 values
    prediction = model.predict([image])
    return jsonify({"prediction": int(prediction[0])})

if __name__ == '__main__':
    PORT = int(os.getenv("PORT", 5000))  # Default port 5000, but configurable
    app.run(host="0.0.0.0", port=PORT)
