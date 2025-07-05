from flask import Flask, request, jsonify
import os 

app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    # simple test reply
    reply = f"You said: {message}"
    return jsonify({'reply': reply})

if __name__ == "__main__":
    # Use PORT from environment if available (Render sets this)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)