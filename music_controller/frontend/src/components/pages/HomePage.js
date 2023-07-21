import React, { useEffect } from 'react';
import { useSpotifyToken } from '../api-call/SpotifyTokens';

function HomePage() {
    const { spotifyToken, initiateSpotifyLogin } = useSpotifyToken();
    console.log("Token in HomePage: ", spotifyToken); // Added this line

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log("Token: ", spotifyToken); // Add this line

        if (!code && !spotifyToken) {
            initiateSpotifyLogin();
        }
    }, [spotifyToken, initiateSpotifyLogin]);

    return (
        <div>
            <button onClick={() => {
                console.log('Log in with Spotify clicked');
                initiateSpotifyLogin();
            }}>
                Log in with Spotify
            </button>
        </div>
    );
}

export default HomePage;
