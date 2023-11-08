from flask import Flask, jsonify, request, abort, send_from_directory
from flask_cors import CORS 
import pyjokes
import os

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
    number = int(request.args.get('number', 1))

    if category not in categories or language not in languages:
        return abort(404)

    matching_jokes = [joke for joke in jokes if joke["category"] == category and joke["language"] == language]

    if number > len(matching_jokes):
        return abort(404)

    return jsonify(matching_jokes[:number])


@app.route('/api/v1/jokes/<int:joke_id>', methods=['GET'])
def get_joke_by_id(joke_id):
    matching_jokes = [joke for joke in jokes if joke["id"] == joke_id]

    if not matching_jokes:
        return abort(404)

    return jsonify(matching_jokes[0])

if __name__ == '__main__':
    app.run(debug=True)
