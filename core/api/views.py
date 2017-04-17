from sqlalchemy import and_, case
from rest_framework import viewsets, permissions
from django.conf import settings

from .serializers import WordSerializer
from core.models import Word, WordScore


class WordsViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        progress = self.request.user.progress
        start_position = progress - settings.TEST_VARIANCE
        if progress - settings.TEST_VARIANCE <= 0:
            start_position = 0

        if self.request.GET.get('propose'):
            word_score_table = settings.SA_BRIDGE[WordScore]
            word_table = settings.SA_BRIDGE[Word]

            words = (
                word_table.select()
                .where(
                    and_(
                        word_table.c.id >= start_position,
                        case(
                            [
                                (word_score_table.c.word_id == word_table.c.id, word_score_table.c.right_answers_in_a_row < 5),
                                (word_score_table.c.word_id != word_table.c.id, True)
                            ], True
                        ),
                    ),
                )
                .limit(10)
                .execute()
            )

            return list(words)
        return Word.objects.all()
