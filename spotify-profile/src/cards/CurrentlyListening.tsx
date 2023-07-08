const clientId = "6c1f6ff1160a4478b366fdc145157a47"; // Replace with your client id
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  redirectToAuthCodeFlow(clientId);
} else {
  const tokens = await getTokens(clientId, code);
  const { access_token, refresh_token } = tokens;
  const profile = await fetchProfile(access_token);
  populateUI(profile);

  // Store the refresh token securely for future use
  localStorage.setItem("refresh_token", refresh_token);

  // Use the access token for retrieving the currently playing track
  await displayCurrentlyPlaying(access_token);
}

// Function to retrieve the access token from local storage and refresh it if necessary
async function getAccessToken() {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (!accessToken && refreshToken) {
    // Refresh the access token using the refresh token
    const tokens = await refreshAccessToken(clientId, refreshToken);
    accessToken = tokens.access_token;

    // Update the stored access token
    localStorage.setItem("access_token", accessToken);
  }

  return accessToken;
}

// Function to fetch the user's currently playing track
async function fetchCurrentlyPlaying(token) {
  // Same implementation as before
}

// Function to display the currently playing track in the UI and toggle visibility
async function displayCurrentlyPlaying(token) {
  const track = await fetchCurrentlyPlaying(token);
  const currentlyPlayingElement = document.getElementById("currentlyPlaying");

  if (!track) {
    // Hide the display when there is no track playing
    currentlyPlayingElement.style.display = "none";
    return;
  }

  // Extract the relevant information from the track object
  const trackName = track.name;
  const artistName = track.artists.map(artist => artist.name).join(", ");
  const albumName = track.album.name;

  // Update your UI with the track information
  // For example, you can display it in a <div> element with an id "currentlyPlaying"
  currentlyPlayingElement.textContent = `Currently Playing: ${trackName} by ${artistName} from the album ${albumName}`;
  currentlyPlayingElement.style.display = "block"; // Show the display
}

// Usage example
getAccessToken()
  .then(token => displayCurrentlyPlaying(token))
  .catch(error => console.error("Error retrieving access token:", error));
