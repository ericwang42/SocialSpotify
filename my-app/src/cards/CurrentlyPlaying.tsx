import React, { useEffect, useState } from 'react';
import './styling/CurrentlyPlaying.css';

interface CurrentlyPlayingProps {
  token: string;
}

interface TrackInfo {
  trackName: string;
  artistName: string;
  albumName: string;
  albumCover?: string;
}

const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ token }) => {
  const [trackInfo, setTrackInfo] = useState<TrackInfo>({
    trackName: '',
    artistName: '',
    albumName: '',
    albumCover: undefined,
  });

  useEffect(() => {
    fetchCurrentlyPlaying(token);
  }, [token]);

  async function fetchCurrentlyPlaying(token: string) {
    const result = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (result.status === 204) {
      setTrackInfo({
        trackName: '',
        artistName: '',
        albumName: '',
        albumCover: undefined,
      });
      return null;
    }

    const data = await result.json();

    // Check if 'item' exists in the response
    if (!data.item) {
      setTrackInfo({
        trackName: '',
        artistName: '',
        albumName: '',
        albumCover: undefined,
      });
      return;
    }

    const track = data.item; // Return the currently playing track object

    // Extract the relevant information from the track object
    const trackName = track.name;
    const artistName = track.artists
      .map((artist: any) => artist.name)
      .join(', ');
    const albumName = track.album.name;
    const albumCover = track.album.images[0]?.url; // Extract the album cover image URL

    setTrackInfo({ trackName, artistName, albumName, albumCover });
  }

  const { trackName, artistName, albumCover } = trackInfo;

  return (
    <>
      {trackName && (
        <div className="currently-playing-card">
          <div className="album-art-container">
            {albumCover && <img src={albumCover} alt="Album cover" />}
          </div>
          <div className="track-info-container">
            <p className="currently-playing-track">{trackName}</p>
            <p className="currently-playing-artist">{artistName}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentlyPlaying;
