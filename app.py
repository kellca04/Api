from flask import Flask, request, jsonify
import pyjokes
import os
os.environ['FLASK_APP'] = 'app'
app = Flask(__name)

@app.route('/', methods=['GET'])
def get_jokes():
    category = request.args.get('category')
    language = request.args.get('language')
    number = int(request.args.get('number'))

    jokes = pyjokes.get_jokes(category=[category], language=[language])
    if not jokes:
        return jsonify({'error': 'No jokes found for the specified category and language.'}), 404

    if number > len(jokes):
        return jsonify({'error': 'Number of jokes requested exceeds available jokes.'}), 400

    random_jokes = jokes[:number]
    return jsonify(random_jokes)

if _name_ == '_main_':
    app.run(debug=True)
