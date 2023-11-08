from flask import Flask, jsonify, request, abort, send_from_directory, session
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

@app.route('/api/v1/jokes', methods=['GET'])
def get_random_joke():
    category = request.args.get('category')
    language = request.args.get('language')
    number = int(request.args.get('number', 1))

    if category not in categories or language not in languages:
        return abort(400) 

    matching_jokes = [joke for joke in jokes if joke["category"] == category and joke["language"] == language]

    if not matching_jokes:
        return abort(404)

    if 'joke_index' not in session:
     
        session['joke_index'] = -1

    joke_index = session['joke_index']

    if joke_index == -1:

        random.shuffle(matching_jokes)


    joke_index = (joke_index + 1) % len(matching_jokes)
    session['joke_index'] = joke_index
    random_jokes = matching_jokes[joke_index:joke_index+number]

    return jsonify(random_jokes)

@app.route('/api/v1/jokes/<int:joke_id>', methods=['GET'])
def get_joke_by_id(joke_id):
    matching_jokes = [joke for joke in jokes if joke["id"] == joke_id]

    if not matching_jokes:
        return abort(404)

    return jsonify(matching_jokes[0])

if __name__ == '__main__':
    app.run(debug=True)
