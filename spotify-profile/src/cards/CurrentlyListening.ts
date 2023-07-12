
export async function displayCurrentlyPlaying(token: string) {
  // Implementation for displaying currently playing track
  const track = await fetchCurrentlyPlaying(token);
  const currentlyPlayingElement = document.getElementById("currentlyPlaying");

  if (!currentlyPlayingElement) {
    return; // Element not found, exit the function
  }

  if (!track) {
    // Hide the display when there is no track playing
    currentlyPlayingElement.textContent = `Not Currently Listening`;
    return;
  }

  // Extract the relevant information from the track object
  const trackName = track.name;
  const artistName = track.artists.map((artist: any) => artist.name).join(", ");
  const albumName = track.album.name;

  // Update your UI with the track information
  // For example, you can display it in a <div> element with an id "currentlyPlaying"
  currentlyPlayingElement.textContent = `Currently Playing: ${trackName} by ${artistName} from the album ${albumName}`;
  currentlyPlayingElement.style.display = "block"; // Show the display
}

async function fetchCurrentlyPlaying(token: string) {
  const result = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });

  if (result.status === 204) {
      return null; // No track is currently playing
  }

  const data = await result.json();
  return data.item; // Return the currently playing track object
}