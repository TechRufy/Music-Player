from django.contrib import admin

# Register your models here.

from django.contrib import admin

from .models import Album , song, Artist, genere

admin.site.register(Album)
admin.site.register(song)
admin.site.register(Artist)
admin.site.register(genere)