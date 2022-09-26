import json
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
from django.core.serializers import serialize
from django.http import JsonResponse
# Create your views here.


class player(generic.ListView):
    template_name = 'MusicPlayer/musicPlayer.html'
    context_object_name = 'lista_canzoni'
    
    def get_queryset(self):
        return song.objects.order_by("Nome")


def caricaCanzoni(request):
    lista_canzoni = song.objects.order_by("Nome")


    t = serialize("json",lista_canzoni)

    print(t)

    return JsonResponse({"data" : t}, status = 200)






