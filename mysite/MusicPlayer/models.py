from django.db import models

# Create your models here.

class Artist(models.Model):
    Nome = models.CharField(max_length=200, primary_key = True)
    Cognome = models.CharField(max_length=200)

class genere(models.Model):
    Nome = models.CharField(max_length=200, primary_key=True)

class Album(models.Model):
    Nome = models.CharField(max_length=200, primary_key=True)
    Artista = models.ForeignKey(Artist, on_delete=models.CASCADE)
    TrackNumer = models.IntegerField()
    release_date = models.DateField()
    genere = models.ForeignKey(genere, on_delete=models.CASCADE)
    PathIMM = models.CharField(max_length=200)


class song(models.Model):
    Nome = models.CharField(max_length=200)
    Artista = models.ForeignKey(Artist, on_delete=models.CASCADE)
    Album = models.ForeignKey(Album, on_delete=models.CASCADE, default="singolo")
    genere = models.ForeignKey(genere, on_delete=models.CASCADE,default="indie")
    PathSong = models.CharField(max_length=200)
        
