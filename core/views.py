from django.shortcuts import render


def index(request):
    from .utils import parse_files
    parse_files()
    return render(request, 'index.html')
