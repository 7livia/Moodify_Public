#  Moodify

*A web app that turns your feelings into Spotify playlists.*

![Playlist Generator](https://i.imgur.com/me3MXR6.png)
![Main Page](https://i.imgur.com/DUz7Jbo.png)
---

##  Introduction

Moodify allows users to type how they feel and generates a matching playlist. It uses **OpenAI** for mood analysis and the **Spotify Web API** to deliver music recommendations. Firebase handles authentication and playlist saving.

---

## Features

- Display Spotify user profile picture in the navbar
- Show user playlists in a searchable sidebar
- Navigate playlists and view details
- Logout functionality clears auth token and redirects
- Stores user data and playlists using Firebase Realtime Database / Firestore

---

## Tech Stack

- React
- Vite
- Tailwind CSS
- Spotify Web API
- Firebase (Realtime Database / Firestore)

---

## Getting Started

### Prerequisites

- Node.js and npm installed
- Spotify Developer Account & registered app
- Spotify OAuth token with scopes:  
  `playlist-read-private`, `user-read-email`, `user-read-private`
- Firebase project with Realtime Database or Firestore configured

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/moodify.git
    cd moodify
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root and add your Spotify tokens and Firebase configuration variables:

    ```
    VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id
    VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Add your Firebase secret key and initialize Firebase in `src/firebase.js`:

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

5. Configure your Spotify auth backend as needed to support OAuth and token exchange.

6. Start the development server:

    ```bash
    npm run dev
    ```

---

## Usage

- Log in with your Spotify account
- Browse your playlists on the sidebar
- Generate or modify playlists based on mood or other filters
- Data is saved and synced with Firebase for persistence
