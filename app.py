from flask import Flask, jsonify, request, abort
import pyjokes

app = Flask(__name__)

categories = ["all", "neutral", "chuck"]


languages = ["en", "de", "es"]


jokes_dict = {}

def generate_jokes():
    for lang in languages:
        jokes_dict[lang] = {}
        for category in categories:
            jokes_dict[lang][category] = []
            for _ in range(10):
                joke_text = pyjokes.get_joke(language=lang, category=category)
                jokes_dict[lang][category].append(joke_text)

generate_jokes()


@app.route('/api/v1/jokes', methods=['GET'])
def get_jokes():
    category = request.args.get('category')
    language = request.args.get('language')
    number = int(request.args.get('number', 1))

    if category not in categories or language not in languages:
        return abort(404)

    jokes = jokes_dict[language][category]
    if number > len(jokes):
        return abort(404)

    return jsonify(jokes[:number])

@app.route('/api/v1/jokes/<int:joke_id>', methods=['GET'])
def get_joke_by_id(joke_id):
    for language in languages:
        for category in categories:
            jokes = jokes_dict[language][category]
            if joke_id < len(jokes):
                return jsonify({"id": joke_id, "category": category, "language": language, "joke": jokes[joke_id]})

    return abort(404)

if __name__ == '__main__':
    app.run(debug=True)

