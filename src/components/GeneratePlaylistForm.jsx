// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { assets } from "../assets/assets";

const GeneratePlaylistForm = () => {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [length, setLength] = useState(3);
  // eslint-disable-next-line no-unused-vars
  const [interactive, setInteractive] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!prompt) {
      alert('Playlist Prompt is required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/generate-playlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          name,
          length,
          interactive,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.error || 'Failed to generate playlist');
        return;
      }

      setMessage(json.message);
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-start pt-20 pb-8 px-4 rounded-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
        style={{ backgroundImage: `url(${assets.carbg})` }}
      ></div>

      <div
        className="absolute top-0 left-0 w-full h-1/5 z-5 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.5))',
        }}
      ></div>

      <div className="relative z-10 bg-black bg-opacity-60 p-6 rounded-xl w-full max-w-sm text-white text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Generate something!</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="text-left">
            <label className="block text-sm font-semibold mb-1 p-2">
              Playlist Prompt
            </label>
            <input
              type="text"
              placeholder="Enter a mood or genre..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{ color: 'rgb(171, 95, 237)' }}
              className="w-full p-3 rounded-full bg-purple-700 bg-opacity-60  focus:outline-none focus:ring-2 focus:ring-purple-300"
              required
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold mb-1 p-2">
              Playlist Name
            </label>
            <input
              type="text"
              placeholder="Enter your playlist name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ color: 'rgb(171, 95, 237)' }}
              className="w-full p-3 rounded-full bg-purple-700 bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          <div className="text-left">
            <label className="block text-sm font-semibold mb-1 p-2">
              Playlist Length
            </label>
            <input
              type="number"
              placeholder="How many songs?"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ color: 'rgb(171, 95, 237)' }}
              className="w-full p-3 rounded-full bg-purple-700 bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-purple-300"
              min={1}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition duration-200"
          >
            Generate
          </button>
        </form>

        {message && (
          <p className="mt-4 text-green-400 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
};

export default GeneratePlaylistForm;
