from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    spotify_username = models.CharField(max_length=100)
    profile_picture = models.ImageField(upload_to='profile_pics', default='default.jpg')
    banner_image = models.ImageField(upload_to='banner_images', default='default.jpg')

class Card(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()
    spotify_playlist_id = models.CharField(max_length=100)

class AlbumCover(models.Model):
    user_profile = models.OneToOneField(UserProfile, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='album_covers')
