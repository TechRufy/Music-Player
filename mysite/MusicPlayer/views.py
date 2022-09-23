from re import S
from django.shortcuts import render
from django.shortcuts import get_object_or_404, render

# Create your views here.

from django.http import Http404
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.urls import reverse
from django.views import generic
# Create your views here.


def player(request):
    return render(request, 'MusicPlayer/musicPlayer.html')
