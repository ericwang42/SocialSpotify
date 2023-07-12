export async function displayTopTracks(token: string) {
    const topTracks = await fetchTopTracks(token);
    const tracksContainer = document.getElementById("tracks");
    if (tracksContainer) {
        tracksContainer.innerHTML = ""; // Clear previous tracks

        topTracks.forEach((track: any) => {
            const trackElement = document.createElement("li");
            trackElement.innerText = track.name;
            tracksContainer.appendChild(trackElement);
        });
    }
}

export async function fetchTopTracks(token: string) {
    const url = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0";
    const response = await fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch top tracks");
    }
  
    const data = await response.json();
    return data.items; // Return the array of top tracks
}