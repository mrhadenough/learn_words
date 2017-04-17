import random
from collections import namedtuple

from sqlalchemy import or_, and_
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from django.conf import settings

from .serializers import WordSerializer
from core.models import Word, WordScore

WordPropose = namedtuple('WordPropose', ['id', 'word', 'translation'])


class WordsViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def list(self, request):
        if request.GET.get('propose'):
            progress = self.request.user.progress
            start_position = progress - settings.TEST_VARIANCE
            if progress - settings.TEST_VARIANCE <= 0:
                start_position = 0

            word_score_table = settings.SA_BRIDGE[WordScore]
            word_table = settings.SA_BRIDGE[Word]
            session = settings.DB_SESSION

            words = (
                session.query(
                    word_table.c.id,
                    word_table.c.word,
                    word_table.c.translation,
                )
                .filter(
                    and_(
                        word_table.c.position >= start_position,
                        or_(
                            word_score_table.c.right_answers_in_a_row == None,  # noqa
                            word_score_table.c.right_answers_in_a_row < 5,
                        ),
                    )
                )
                .outerjoin(word_score_table, word_score_table.c.word_id == word_table.c.id)
                .order_by('position')
                .limit(20)
            )
            result = [WordPropose(*i)._asdict() for i in words][:10]
            random.shuffle(result)
            return Response(result)
        return super(WordsViewSet, self).list(request)
