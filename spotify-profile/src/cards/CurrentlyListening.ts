import * as Spotify from '../spotify';

export async function displayCurrentlyPlaying(token: string) {
  // Implementation for displaying currently playing track
  const track = await Spotify.fetchCurrentlyPlaying(token);
  const currentlyPlayingElement = document.getElementById("currentlyPlaying");

  if (!currentlyPlayingElement) {
    return; // Element not found, exit the function
  }

  if (!track) {
    // Hide the display when there is no track playing
    currentlyPlayingElement.style.display = "none";
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