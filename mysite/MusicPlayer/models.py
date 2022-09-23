from django.db import models

# Create your models here.

class song(models.Model):
    Nome = models.CharField(max_length=200)
    

