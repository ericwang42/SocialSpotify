from dotenv import load_dotenv
import os
import base64
from requests import post
import json
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials


load_dotenv()

client_id = os.getenv("CLIENT_ID")
client_secret = os.getenv("CLIENT_SECRET")

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id="6c1f6ff1160a4478b366fdc145157a47",
                                               client_secret="815982e60aeb423c8a9576d4c2263466",
                                               redirect_uri="https://crunchyroll.com/",
                                               scope="user-library-read"))

def get_token():
    auth_string = client_id + ":" + client_secret
    auth_bytes = auth_string.encode("utf-8")
    auth_base64 = str(base64.b64encode(auth_bytes), "utf-8")

    url = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + auth_base64,
        "Content-Type": "application/x-www-form-urlencoded"
    }
    data = {"grant_type":"client_credentials"}
    result = post(url, headers=headers, data=data)
    json_result = json.loads(result.content)
    token = json_result["access_token"]
    return token


def get_auth_header(token):
    return {"Authorization": "Bearer" + token}

token = get_token()
print(token)
