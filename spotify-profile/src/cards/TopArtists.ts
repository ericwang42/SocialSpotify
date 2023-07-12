export async function displayTopArtists(token: string) {
    const topArtists = await fetchTopArtists(token);
    const artistsContainer = document.getElementById("Artists");
    if (artistsContainer) {
        artistsContainer.innerHTML = ""; // Clear previous tracks

        topArtists.forEach((artist: any) => {
            const artistsElement = document.createElement("li");
            artistsElement.innerText = artist.name;
            artistsContainer.appendChild(artistsElement);
        });
    }
}

export async function fetchTopArtists(token: string): Promise<any[]> {
    const url = "https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10&offset=0";
    const response = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
  
    if (!response.ok) {
        throw new Error("Failed to fetch top Artists");
    }
  
    const data = await response.json();
    return data.items; // Return the array of top tracks
}
