import React, { useEffect, useState } from 'react';

interface CurrentlyPlayingProps {
  token: string;
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ token }) => {
  const [trackInfo, setTrackInfo] = useState({
    trackName: '',
    artistName: '',
    albumName: '',
  });

  useEffect(() => {
    // Similar to componentDidMount and componentDidUpdate:
    fetchCurrentlyPlaying(token);
  }, [token]); // Empty array ensures that effect is only run on mount and unmount

  async function fetchCurrentlyPlaying(token: string) {
    const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (result.status === 204) {
      setTrackInfo({ trackName: '', artistName: '', albumName: '' });
      return null; // No track is currently playing
    }

    const data = await result.json();
    const track = data.item; // Return the currently playing track object

    // Extract the relevant information from the track object
    const trackName = track.name;
    const artistName = track.artists.map((artist: any) => artist.name).join(", ");
    const albumName = track.album.name;
    
    setTrackInfo({ trackName, artistName, albumName });
  }

  const { trackName, artistName, albumName } = trackInfo;

  return (
    <div>
      {trackName ? 
        <p>Currently Playing: {trackName} by {artistName} from the album {albumName}</p> : 
        <p>Not Currently Listening</p>
      }
    </div>
  );
};

export default CurrentlyPlaying;
