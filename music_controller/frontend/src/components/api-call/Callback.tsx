import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpotifyToken } from './SpotifyTokens';

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  const { spotifyToken, fetchToken } = useSpotifyToken(); // Destructure fetchToken and spotifyToken from the hook

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code'); // Get the 'code' param
    console.log("Code: ", code);
    if (code) {
      fetchToken(code).then(() => {  // Fetch the token using the authorization code
        // Fetch user profile data from Spotify
        fetch('https://api.spotify.com/v1/me', {
          headers: { 'Authorization': `Bearer ${spotifyToken}` },
        }).then(response => response.json()).then(data => {
          // Post the data to your Django backend
          fetch('/api/userprofiles/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
        });

        // Redirect to the profile page
        navigate('/profile');
      });
    }
  }, [location, navigate, fetchToken, spotifyToken]); // Include spotifyToken in the dependency array

  return <div>Processing...</div>;
}
