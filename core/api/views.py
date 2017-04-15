from rest_framework import viewsets

from .serializers import WordSerializer
from core.models import Word


class WordsViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
