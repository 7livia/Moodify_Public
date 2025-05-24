# Moodify

A web app that turns your feelings into Spotify playlists.

---

## Features

- Display the Spotify user's profile picture in the navigation bar
- View and search through user playlists in a collapsible sidebar
- Navigate playlists and view track details
- Logout function clears the authentication token and redirects to login
- Store user data and playlists with Firebase Realtime Database or Firestore

---

## Tech Stack

- React with Vite
- Tailwind CSS for styling
- Spotify Web API
- Firebase (Realtime Database or Firestore)

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Spotify Developer account with a registered app
- Spotify OAuth token with the following scopes:  
  `playlist-read-private`, `user-read-email`, `user-read-private`
- Firebase project with Realtime Database or Firestore configured

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/moodify.git
    cd moodify
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your Spotify and Firebase credentials:

    ```env
    VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
    VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Initialize Firebase in `src/firebase.js`:

    ```js
    // src/firebase.js
    import { initializeApp } from "firebase/app";
    import { getDatabase } from "firebase/database"; // or getFirestore from "firebase/firestore";

    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    const app = initializeApp(firebaseConfig);
    export const database = getDatabase(app); // or export const db = getFirestore(app);
    ```

5. Set up your backend to handle Spotify OAuth and token exchange.

6. Run the development server:

    ```bash
    npm run dev
    ```

---

## Usage

- Log in with your Spotify account
- View your playlists in the sidebar
- Generate new playlists or modify existing ones based on mood or keywords
- All changes are saved and synced via Firebase
