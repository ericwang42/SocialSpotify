import requests
from rest_framework import serializers
from .models import UserProfile, Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ('id', 'card_type', 'card_data')


class UserProfileSerializer(serializers.ModelSerializer):
    cards = CardSerializer(many=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'spotify_id', 'display_name', 'profile_image',
                  'banner_image', 'followers', 'email', 'country', 'product', 'cards')

    def create(self, validated_data):
        # Extract cards data from the validated data
        cards_data = validated_data.pop('cards')

        # Get Spotify API data somehow
        spotify_data = self.get_spotify_data(
            validated_data.pop('spotify_token'))

        # Create the user profile with the Spotify data
        user_profile = UserProfile.objects.create(
            spotify_id=spotify_data['id'],
            display_name=spotify_data['display_name'],
            # assuming 'images' field exists and is not empty
            profile_image=spotify_data['images'][0]['url'],
            # you'll need to replace this with correct logic
            banner_image=spotify_data['banner_image'],
            # assuming 'followers' field exists and has 'total'
            followers=spotify_data['followers']['total'],
            email=spotify_data['email'],
            country=spotify_data['country'],
            product=spotify_data['product'],
            **validated_data
        )

        # Create cards associated with the user profile
        for card_data in cards_data:
            Card.objects.create(user_profile=user_profile, **card_data)

        return user_profile


def get_spotify_data(self, spotify_token):
    headers = {"Authorization": f"Bearer {spotify_token}"}
    response = requests.get('https://api.spotify.com/v1/me', headers=headers)

    if response.status_code == 200:
        return response.json()  # Return the user's profile data as a dictionary
    else:
        # Handle errors, e.g. log them and re-raise the exception, or return a default dictionary
        return {}
