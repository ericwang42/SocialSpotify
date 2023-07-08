import * as Spotify from './spotify';
import { displayCurrentlyPlaying } from './cards/CurrentlyListening';

const clientId = "6c1f6ff1160a4478b366fdc145157a47";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
    Spotify.redirectToAuthCodeFlow(clientId);
} else {
    const tokens = await Spotify.getTokens(clientId, code);
    const { access_token, refresh_token } = tokens;
    const profile = await Spotify.fetchProfile(access_token);
    Spotify.populateUI(profile);

    localStorage.setItem("refresh_token", refresh_token);

    await displayCurrentlyPlaying(access_token);
}

const refreshToken = localStorage.getItem("refresh_token");
if (refreshToken) {
    const newAccessToken = await Spotify.refreshAccessToken(clientId, refreshToken);
    // Use the new access token for API requests or update the existing access token in your code
    // For example: accessToken = newAccessToken;
}
