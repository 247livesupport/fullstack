from flask import Flask
from flask_socketio import SocketIO, emit
from textblob import TextBlob # Simple logic for 2026 sentiment

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('message')
def handle_message(data):
    text = data.get('text', '')
    # Logic: Analyze sentiment (-1.0 to 1.0)
    analysis = TextBlob(text).sentiment.polarity
    
    # Tag the message mood
    mood = "neutral"
    if analysis > 0.1: mood = "positive"
    elif analysis < -0.1: mood = "negative"
    
    # Send it back to everyone
    emit('message', {
        'text': text,
        'mood': mood,
        'user': data.get('user', 'Guest')
    }, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, port=5000)