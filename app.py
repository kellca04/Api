from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import pyjokes

app = Flask(__name__)
CORS(app)  # Enable CORS for your Flask app

# Initialize an empty list to store jokes
jokes_list = []

# Endpoint to add a new joke
@app.route('/add_joke', methods=['POST'])
def add_joke():
    joke = pyjokes.get_joke()
    joke_id = len(jokes_list) + 1
    jokes_list.append({"id": joke_id, "joke": joke})
    return jsonify({"message": "Joke added successfully", "joke_id": joke_id})

# Endpoint to retrieve all jokes
@app.route('/get_jokes', methods=['GET'])
def get_jokes():
    return jsonify(jokes_list)

if __name__ == '__main__':
    app.run(debug=True)
