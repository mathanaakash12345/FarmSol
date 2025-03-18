from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import pandas as pd
import joblib

app = Flask(__name__)

# Explicitly allow requests from your frontend
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Load your trained model
model = joblib.load(r'R:\PROJECTS\ForMot\Web\Client\FarmSol\BackEnd\python\model.pkl')

# Crop mapping for encoding
crop_mapping = {
    'Apple': 0, 'Banana': 1, 'Bhindi': 2, 'Bitter Gourd': 3, 'Brinjal': 4,
    'Cabbage': 5, 'Capsicum': 6, 'Carrot': 7, 'Cauliflower': 8,
    'Cluster Beans': 9, 'Colacasia': 10, 'Cucumbar': 11,
    'Dry Fodder': 12, 'French Beans': 13, 'Grapes': 14,
    'Green Chilli': 15, 'Green Fodder': 16, 'Guava': 17,
    'Leafy Vegetable': 18, 'Lemon': 19, 'Maize': 20,
    'Mango': 21, 'Methi(Leaves)': 22, 'Mousambi': 23,
    'Onion': 24, 'Pear': 25, 'Pomegranate': 26, 'Potato': 27,
    'Pumpkin': 28, 'Raddish': 29, 'Sponge Gourd': 30,
    'Sweet Potato': 31, 'Tinda': 32, 'Tomato': 33, 'Wheat': 34,
    'blackgram': 35, 'chickpea': 36, 'coconut': 37, 'coffee': 38,
    'cotton': 39, 'jute': 40, 'kidneybeans': 41, 'lentil': 42,
    'mothbeans': 43, 'mungbean': 44, 'muskmelon': 45, 'orange': 46,
    'papaya': 47, 'pigeonbeans': 48, 'rice': 49, 'watermelon': 50
}

@app.route('/predict', methods=['POST'])
def predict():
    try:
        state = request.json.get('location')
        district = request.json.get('district')
        date = request.json.get('date')
        crop = request.json.get('preferredcrop').capitalize()
        production = 1

        # Convert date to year
        year = pd.to_datetime(date).year

        # Encode the crop using the mapping
        crop_encoded = crop_mapping.get(crop, -1)

        if crop_encoded == -1:
            return jsonify({'error': 'Invalid crop name'}), 400

        # Prepare input for model prediction
        input_data = pd.DataFrame({
            'year': [year],
            'crop': [crop_encoded],
            'production': [production]
        })

        # Use the model to make predictions
        predicted_price = model.predict(input_data)[0]
        print(predicted_price)
        pp="{:.2f}".format(predicted_price)
        return jsonify({'predicted_price': pp})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # Return error message

if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)
