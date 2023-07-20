from django.contrib import admin
from django.urls import path, include
from .views import UserProfileView

urlpatterns = [
    path('home', UserProfileView.as_view()),
]
