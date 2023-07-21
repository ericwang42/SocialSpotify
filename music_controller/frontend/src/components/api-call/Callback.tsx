import React from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSpotifyToken } from './SpotifyTokens';

export default function Callback() {
  const location = useLocation();
  const navigate = useNavigate();

  const { fetchToken } = useSpotifyToken(); // Destructure fetchToken from the hook

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code'); // Get the 'code' param
    console.log("Code: ", code);
    if (code) {
      fetchToken(code); // Fetch the token using the authorization code

      // Redirect to the profile page
      navigate('/profile');
    }
  }, [location, navigate, fetchToken]); // Include fetchToken in the dependency array

  return <div>Processing...</div>;
}
