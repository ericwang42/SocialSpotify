export const clientId = "61a5d7889496482bae1236a07b7b76a6";

export async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    params.append("scope", "user-read-private user-read-email user-top-read user-read-currently-playing");

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getTokens(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    return await result.json();
}

export async function refreshAccessToken(clientId: string, refreshToken: string) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", refreshToken);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

export async function getAccessToken(clientId: string, code: string): Promise<string> {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    return await result.json();
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

export function populateTracks(topTracks: any){
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

export async function fetchTopArtists(token: string) {
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

export function populateArtists(topArtists: any){
    const artistsContainer = document.getElementById("Artists");
    if (artistsContainer) {
        artistsContainer.innerHTML = ""; // Clear previous tracks

        topArtists.forEach((track: any) => {
            const artistsElement = document.createElement("li");
            artistsElement.innerText = track.name;
            artistsContainer.appendChild(artistsElement);
        });
    }
}

export function populateProfile(profile: any) {
    document.getElementById("displayName")!.innerText = profile.display_name;
    if (profile.images[0]) {
        const profileImage = new Image(200, 200);
        profileImage.src = profile.images[0].url;
        profileImage.classList.add("circular-image"); 
        document.getElementById("avatar")!.appendChild(profileImage);
    }
    document.getElementById("id")!.innerText = profile.id;
    document.getElementById("email")!.innerText = profile.email;
    document.getElementById("uri")!.innerText = profile.uri;
    document.getElementById("uri")!.setAttribute("href", profile.external_urls.spotify);
    document.getElementById("url")!.innerText = profile.href;
    document.getElementById("url")!.setAttribute("href", profile.href);
    document.getElementById("imgUrl")!.innerText = profile.images[0]?.url ?? '(no profile image)';
}

