from re import S
from django.shortcuts import render
from django.shortcuts import get_object_or_404, render

# Create your views here.

from django.http import Http404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.views import generic
from .models import song
# Create your views here.


class player(generic.ListView):
    template_name = 'MusicPlayer/musicPlayer.html'
    context_object_name = 'lista_canzoni'
    
    def get_queryset(self):
        return song.objects.order_by("Nome")
