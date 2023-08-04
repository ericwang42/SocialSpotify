from django.db import models
from django.contrib.postgres.fields import JSONField


class Card(models.Model):
    CARD_TYPES = (
        ('CT1', 'Card Type 1'),
        ('CT2', 'Card Type 2'),
        ('CT3', 'Card Type 3'),
        ('CT4', 'Card Type 4'),
    )

    card_type = models.CharField(max_length=3, choices=CARD_TYPES)
    card_data = JSONField()

    def __str__(self):
        return self.card_type


class UserProfile(models.Model):
    spotify_id = models.CharField(max_length=200, unique=True)
    display_name = models.CharField(max_length=200)
    profile_image = models.URLField()
    banner_image = models.URLField()
    followers = models.IntegerField()
    email = models.EmailField()
    country = models.CharField(max_length=200)
    product = models.CharField(max_length=200)

    cards = models.ManyToManyField(Card)

    def __str__(self):
        return self.display_name
