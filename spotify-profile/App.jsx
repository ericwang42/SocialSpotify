import React from 'react';
import ReactDOM from 'react-dom';

function SpotifyProfile() {
  return (
    <div>
      <h1>My Spotify Profile</h1>

      <section id="profile">
        <h2>Logged in as <span id="displayName"></span></h2>
        <div id="avatar"></div>
        <ul>
          <li>User ID: <span id="id"></span></li>
          <li>Email: <span id="email"></span></li>
          <li>Spotify URI: <a id="uri" href="#"></a></li>
          <li>Link: <a id="url" href="#"></a></li>
          <li>Profile Image: <span id="imgUrl"></span></li>
          <li><a id="currentlyPlaying"></a></li>
        </ul>
      </section>

      <h1>Top Tracks</h1>
      <div id="tracks"></div>

      <script src="src/script.ts" type="module"></script>
      <script src="src/cards/CurrentlyListening.ts" type="module"></script>
    </div>
  );
}

ReactDOM.render(<SpotifyProfile />, document.getElementById('root'));
