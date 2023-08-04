from django.shortcuts import render
from rest_framework import generics, status
from .serializers import UserProfileSerializer, CardSerializer
from .models import UserProfile, Card
from rest_framework.views import APIView
from rest_framework.response import Response


class UserProfileView(generics.ListAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class CreateUserProfileView(APIView):
    serializer_class = UserProfileSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_profile = serializer.save()
            return Response(UserProfileSerializer(user_profile).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
