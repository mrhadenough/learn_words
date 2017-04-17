from sqlalchemy import or_, and_
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
            session = settings.DB_SESSION

            words = (
                session.query(word_table.c.id)
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
                .limit(10)
            )
            ids = [i[0] for i in session.execute(words)]
            return Word.objects.filter(id__in=ids)
        return Word.objects.all()
