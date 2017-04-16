from rest_framework import viewsets

from .serializers import WordSerializer
from core.models import Word


class WordsViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer

    def get_queryset(self):
        # TODO: show offers according to user score
        # if self.request.GET.get('propose'):
        #     Word.objects.all()
        return Word.objects.all()
