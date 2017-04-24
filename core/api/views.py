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
        if self.request.GET.get('propose'):
            progress = self.request.user.progress
            start_position = progress - settings.TEST_VARIANCE
            if progress - settings.TEST_VARIANCE <= 0:
                start_position = 0

            words = (
                Word.sa.query(
                    Word.sa.id,
                    Word.sa.translation,
                )
                .filter(
                    and_(
                        Word.sa.position >= start_position,
                        or_(
                            WordScore.sa.right_answers_in_a_row == None,  # noqa
                            WordScore.sa.right_answers_in_a_row < 5,
                        ),
                    )
                )
                .outerjoin(WordScore.sa, WordScore.sa.word_id == Word.sa.id)
                .order_by('position')
                .limit(20)
            )
            return words
        return Word.query.all()
