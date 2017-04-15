from django.shortcuts import render
from django.conf import settings


def index(request):
    context = {
        'HOST': settings.HOST,
    }
    return render(request, 'index.html', context)
