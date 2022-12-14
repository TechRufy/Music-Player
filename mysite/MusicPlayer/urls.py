from django.urls import path

from . import views

app_name = 'MusicPlayer'

urlpatterns = [
    path('', views.player.as_view(), name='player'),
    path('caricaCanzoni', views.caricaCanzoni, name='caricaCanzoni'),
    path('<str:pk>/', views.PaginaArtista.as_view(), name='PaginaArtista')
    
]