import { useState, useEffect } from 'react';
import * as Spotify from './spotify';

export function useSpotifyToken() {
  const [spotifyToken, setSpotifyToken] = useState('');

  useEffect(() => {
    async function fetchToken() {
      const clientId = '6c1f6ff1160a4478b366fdc145157a47';
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');

      if (!code) {
        Spotify.redirectToAuthCodeFlow(clientId);
      } else {
        const tokens = await Spotify.getTokens(clientId, code);
        const { access_token, refresh_token } = tokens;

        setSpotifyToken(access_token);

        localStorage.setItem('refresh_token', refresh_token);
      }

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        const newAccessToken = await Spotify.refreshAccessToken(
          clientId,
          refreshToken,
        );
        setSpotifyToken(newAccessToken);
      }
    }

    fetchToken();
  }, []);

  return spotifyToken;
}
