import React from 'react';
import CurrentlyPlaying from './cards/CurrentlyPlaying';
import Profile from './default-card/Profile';
import { useSpotifyToken } from './api-call/SpotifyTokens';
import './App.css';
import TopTracks from './cards/TopTracks';
import TopArtists from './cards/TopArtists';

function SpotifyProfile() {
  const spotifyToken = useSpotifyToken();

  return (
    <div className="spotify-card">
      <Profile token={spotifyToken} />

      <div style={{ marginTop: '10px' }}>
        <CurrentlyPlaying token={spotifyToken} />
      </div>

      <div style={{ marginTop: '10px' }}>
        <TopTracks token={spotifyToken} />
      </div>

      <div style={{ marginTop: '10px' }}>
        <TopArtists token={spotifyToken} />
      </div>
    </div>
  );
}

export default SpotifyProfile;
