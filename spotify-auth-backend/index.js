/* eslint-disable no-undef */
// index.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const admin = require("firebase-admin");
require("dotenv").config(); // Loads .env file

const serviceAccount = require("./serviceAccountKey.json"); // Firebase Admin SDK JSON file

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Spotify OAuth constants from .env
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;

// 🔐 Step 1: Redirect user to Spotify auth page
app.get("/login", (req, res) => {
  console.log("Redirect URI from env:", redirect_uri); // Add this line to debug
  const scopes = "user-read-private user-read-email playlist-read-private";
  const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(
    scopes
  )}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
  console.log("Spotify Auth URL:", authUrl); // To see the full URL sent to Spotify
  res.redirect(authUrl);
});

// 🔑 Step 2: Handle callback from Spotify with code, exchange it for access_token
app.get("/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = tokenResponse.data;

    // Get Spotify user profile
    const userResponse = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const spotifyUser = userResponse.data;

    // Save or update user in Firebase
    const userRef = admin.firestore().collection("users").doc(spotifyUser.id);
    await userRef.set(
      {
        display_name: spotifyUser.display_name,
        email: spotifyUser.email,
        spotify_id: spotifyUser.id,
        profile_url: spotifyUser.external_urls.spotify,
        image: spotifyUser.images?.[0]?.url || null,
        last_login: new Date().toISOString(),
      },
      { merge: true }
    );

    // Send token to frontend or redirect
    res.redirect(`http://localhost:5173/app?access_token=${access_token}`);
  } catch (err) {
    console.error("Spotify Auth Error:", err.response?.data || err.message);
    res.status(400).send("Authentication failed.");
  }
});

// ✅ Server listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
