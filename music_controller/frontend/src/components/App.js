import React from 'react';
import { render } from 'react-dom';
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
import HomePage from './pages/HomePage';

function App() {
  const { spotifyToken, fetchToken } = useSpotifyToken();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/profile" element={<Profile token={spotifyToken} />} />
        <Route path="/spotify-card" element={
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
        } />
      </Routes>
      <Navbar />
    </Router>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
