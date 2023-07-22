import React, { useEffect } from 'react';
import { useSpotifyToken } from '../api-call/SpotifyTokens';
import { redirectToAuthCodeFlow, clientId } from '../api-call/spotify';  // Import redirectToAuthCodeFlow

function HomePage() {
    const { spotifyToken, fetchToken } = useSpotifyToken();
    console.log("Token in HomePage: ", spotifyToken);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        console.log("Token: ", spotifyToken);

        if (code) {
            fetchToken(code);
        } else if (!spotifyToken) {
            redirectToAuthCodeFlow(clientId);  // Use redirectToAuthCodeFlow here
        }
    }, [spotifyToken, fetchToken]);

    return (
        <div>
            <button onClick={() => {
                console.log('Log in with Spotify clicked');
                redirectToAuthCodeFlow(clientId);  // Use redirectToAuthCodeFlow here
            }}>
                Log in with Spotify
            </button>
        </div>
    );
}

export default HomePage;
