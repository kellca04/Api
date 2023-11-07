from flask import Flask, request, jsonify
import pyjokes

app = Flask(app)

# Mock database for jokes
jokes_db = []

@app.route('/get_jokes', methods=['GET'])
def get_jokes():
    language = request.args.get('language', 'en')
    category = request.args.get('category', 'all')
    count = int(request.args.get('count', 1))

    jokes = []
    for _ in range(count):
        joke = pyjokes.get_joke(language, category)
        jokes.append({
            'ID': len(jokes_db) + 1,
            'Joke': joke,
            'Category': category,
            'Language': language
        })
        jokes_db.append(joke)

    return jsonify(jokes)

@app.route('/get_joke_by_id', methods=['GET'])
def get_joke_by_id():
    joke_id = int(request.args.get('id'))
    language = request.args.get('language', 'en')

    if 0 < joke_id <= len(jokes_db):
        return jsonify({
            'ID': joke_id,
            'Joke': jokes_db[joke_id - 1],
            'Category': 'unknown',
            'Language': language
        })
    else:
        return jsonify({'error': 'Invalid ID'})

if __name__ == '__main__':
    app.run()
