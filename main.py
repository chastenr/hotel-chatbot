from flask import Flask, request, jsonify, send_from_directory
import os
from openai import OpenAI

app = Flask(__name__, static_folder='static')
client = OpenAI()
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    reply = f"You said: {message}"
    return jsonify({'reply': reply})

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
