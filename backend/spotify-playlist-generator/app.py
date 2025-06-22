from flask import Flask, request, jsonify
from playlist_generator import SpotifyPlaylist  # your existing class
import threading
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/generate-playlist', methods=['POST'])
def generate_playlist():
    data = request.json
    prompt = data.get('prompt')
    length = int(data.get('length', 3))
    name = data.get('name') or prompt
    interactive = data.get('interactive', False)

    if not prompt:
        return jsonify({'error': 'Prompt is required'}), 400

    playlist = SpotifyPlaylist(prompt, length, name, interactive)

    def run_playlist():
        playlist.main()
        # You can add logging or save results here if needed

    thread = threading.Thread(target=run_playlist)
    thread.start()

    return jsonify({
        'message': f'Playlist generation started for "{name}" with {length} songs.',
    })

if __name__ == '__main__':
    app.run(port=5000)
