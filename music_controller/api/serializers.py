from rest_framework import serializers
from .models import AlbumCover, UserProfile, Card


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'spotify_username',
                  'profile_picture', 'banner_image')
        
class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['title', 'content', 'spotify_playlist_id']

class AlbumCoverSerializer(serializers.ModelSerializer):
    class Meta:
        model = AlbumCover
        fields = ['user_profile', 'image']