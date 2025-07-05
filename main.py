from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Hotel chatbot backend is running!"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    message = data.get('message', '')
    # simple test reply
    reply = f"You said: {message}"
    return jsonify({'reply': reply})

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
