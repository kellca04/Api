from flask import Flask, jsonify, request, abort, send_from_directory
from flask_cors import CORS
import pyjokes
import os
import random

app = Flask("app")
CORS(app)

categories = ["all", "neutral", "chuck"]
languages = ["en", "de", "es"]
jokes = []
joke_id_counter = 1

def generate_jokes():
    global joke_id_counter
    for lang in languages:
        for category in categories:
            try:
                joke_text = pyjokes.get_joke(language=lang, category=category)
                jokes.append({
                    "id": joke_id_counter,
                    "category": category,
                    "language": lang,
                    "joke": joke_text
                })
                joke_id_counter += 1
            except pyjokes.pyjokes.CategoryNotFoundError:
                pass

generate_jokes()

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/api/v1/jokes', methods=['GET'])
def get_jokes():
    category = request.args.get('category')
    language = request.args.get('language')
    number = int(request.args.get('number', 1
