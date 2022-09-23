from django.urls import path

from . import views

app_name = 'MusicPlayer'

urlpatterns = [
    path('', views.player, name='player'),
    
]