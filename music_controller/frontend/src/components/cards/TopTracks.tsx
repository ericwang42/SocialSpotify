import React, { useEffect, useState } from 'react';
import './styling/TopTracks.css';

interface Track {
  id: string;
  name: string;
}

interface TopTracksProps {
  token: string;
}

const TopTracks: React.FC<TopTracksProps> = ({ token }) => {
  const [topTracks, setTopTracks] = useState<Track[]>([]);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch(
          'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch top tracks');
        }

        const data = await response.json();
        setTopTracks(data.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopTracks();
  }, [token]);

  return (
    <div className="top-tracks">
      <h2 className="top-tracks__heading">Top Tracks</h2>
      <ul className="top-tracks__list">
        {topTracks.map((track) => (
          <li key={track.id} className="top-tracks__item">
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopTracks;
