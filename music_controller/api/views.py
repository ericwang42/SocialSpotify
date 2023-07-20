from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics
from .serializers import UserProfileSerializer, CardSerializer, AlbumCoverSerializer
from .models import UserProfile, Card, AlbumCover



# Create your views here.

class UserProfileView(generics.CreateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class CardList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class AlbumCoverList(generics.ListCreateAPIView):
    queryset = AlbumCover.objects.all()
    serializer_class = AlbumCoverSerializer

