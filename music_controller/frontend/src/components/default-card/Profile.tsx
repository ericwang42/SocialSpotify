import React, { useEffect, useState } from 'react';
import './styling/Profile.css';

interface ProfileProps {
  token: string;
}

const Profile: React.FC<ProfileProps> = ({ token }) => {
  const [profile, setProfile] = useState({
    displayName: '',
    id: '',
    email: '',
    uri: '',
    href: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchProfile(token);
  }, [token]);

  async function fetchProfile(token: string) {
    const result = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await result.json();

    // Check if 'images' exists and has at least two items
    const imageUrl =
      data.images && data.images[1] ? data.images[1].url : '(no profile image)';

    setProfile({
      displayName: data.display_name,
      id: data.id,
      email: data.email,
      uri: data.uri,
      href: data.href,
      imageUrl,
    });
  }

  return (
    <section id="profile">
      <div id="avatar">
        {profile.imageUrl && <img src={profile.imageUrl} alt="avatar" />}
        <h2>
          <span id="displayName">{profile.displayName}</span>
        </h2>
      </div>
      <ul>
        <li>
          User ID: <span id="id">{profile.id}</span>
        </li>
        {/* <li>Email: <span id="email">{profile.email}</span></li> */}
        {/* <li>Spotify URI: <button id="uri">{profile.uri}</button></li> */}
        {/* <li>Link: <button id="url">{profile.href}</button></li> */}
        {/* <li>Profile Image: <span id="imgUrl">{profile.imageUrl}</span></li> */}
      </ul>
    </section>
  );
};

export default Profile;
