import React, { useEffect, useState } from 'react';
import './styling/TopArtists.css';

interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

interface TopArtistsProps {
  token: string;
}

const TopArtists: React.FC<TopArtistsProps> = ({ token }) => {
  const [topArtists, setTopArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const response = await fetch(
          'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=3&offset=0',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch top artists');
        }

        const data = await response.json();
        const artists = data.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          imageUrl: item.images[0]?.url || '', // Use the first image's URL or empty string if not available
        }));
        setTopArtists(artists);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopArtists();
  }, [token]);

  return (
    <div className="top-artists">
      <h2 className="top-artists__heading">Top Artists</h2>
      <ul className="top-artists__list">
        {topArtists.map((artist) => (
          <li key={artist.id} className="top-artists__item">
            <img
              src={artist.imageUrl}
              alt={artist.name}
              className="top-artists__image"
            />
            <span className="top-artists__name">{artist.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopArtists;
