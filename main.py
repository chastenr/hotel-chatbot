from flask import Flask, request, jsonify
from openai import OpenAI
import os

app = Flask(__name__)
client = OpenAI()

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = client.chat.completions.create(
        model="o4-mini",
        messages=[
            {"role": "system", "content": "You are a friendly hotel assistant."},
            {"role": "user", "content": user_message}
        ]
    )
    reply = response.choices[0].message.content
    return jsonify({'reply': reply})

if __name__ == "__main__":
    app.run()
