import { useState, useEffect } from 'react';
import * as Spotify from './spotify';

export function useSpotifyToken() {
  const [spotifyToken, setSpotifyToken] = useState('');

  async function fetchToken(code: string) {
    const clientId = '6c1f6ff1160a4478b366fdc145157a47';
    const tokens = await Spotify.getTokens(clientId, code);
    const { access_token, refresh_token } = tokens;

    setSpotifyToken(access_token);

    localStorage.setItem('refresh_token', refresh_token);

    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      const newAccessToken = await Spotify.refreshAccessToken(
        clientId,
        refreshToken,
      );
      setSpotifyToken(newAccessToken);
    }
  }

  return { spotifyToken, fetchToken };
}