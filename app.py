from flask import Flask, jsonify, request
import pyjokes

app = Flask(__name__)

# Sample joke categories
categories = ["all", "neutral", "chuck"]

# Sample joke languages
languages = ["en", "de", "es"]

# Initialize an empty list to store jokes
jokes = []

# Counter to generate unique joke IDs
joke_id_counter = 1

# Generate jokes and populate the jokes list
def generate_jokes():
    global joke_id_counter
    for lang in languages:
        for category in categories:
            joke_text = pyjokes.get_joke(language=lang, category=category)
            jokes.append({
                "id": joke_id_counter,
                "category": category,
                "language": lang,
                "joke": joke_text
            })
            joke_id_counter += 1

generate_jokes()

# Route to get a list of jokes
@app.route('/api/jokes', methods=['GET'])
def get_jokes():
    return jsonify(jokes)

if __name__ == '__main__':
    app.run(debug=True)
