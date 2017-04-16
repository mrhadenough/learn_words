from django.shortcuts import render
from django.conf import settings


def index(request):
    context = {
        'HOST': settings.HOST,
        'FACEBOOK_ID': settings.FACEBOOK_ID,
    }
    return render(request, 'index.html', context)
