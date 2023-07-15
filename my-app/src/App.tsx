import React from 'react';
import CurrentlyPlaying from './cards/CurrentlyPlaying';
import Profile from './default-card/Profile';
import { useSpotifyToken } from './api-call/SpotifyTokens';
import './App.css';
import TopTracks from './cards/TopTracks';
import TopArtists from './cards/TopArtists';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './default-card/Navbar';
import Callback from './api-call/Callback';
import Search from './pages/Search';

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
      <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<Profile token={spotifyToken} />} />
      </Routes>
      <Navbar />
    </Router>
    </div>

    
  );
}

export default SpotifyProfile;
