from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import render

from .models import Word


def index(request):
    return render(request, 'index.html')

def get_random_word(request):
    words = Word.objects.order_by('?').all()[:5]
    options = []
    for word in words:
        word = {
            'id': word.id,
            'name': word.name,
            'transcription': word.transcription,
            'translation': word.translation,
            'frequency': word.frequency,
        }
        options.append(word)
    data = {
        'word': options[0],
        'options': options[1:],
    }
    return JsonResponse(data)
