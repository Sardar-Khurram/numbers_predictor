from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load the model
model = joblib.load('numbers_predictor\\backend\\best_mlp_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    image = data['image']  # Expecting a flattened array of 784 values
    prediction = model.predict([image])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(port=5000)