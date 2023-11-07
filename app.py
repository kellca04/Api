from flask import Flask, request, jsonify
import pyjokes

app = Flask(__name)

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
           
