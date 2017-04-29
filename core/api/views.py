import random

from sqlalchemy import or_, and_
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings

from .serializers import WordSerializer
from core.models import Word, WordScore
from core.utils import encrypt_text, decrypt_text


lang_dict = {
    'en': Word.sa.word_en,
    'uk': Word.sa.word_uk,
    'ru': Word.sa.word_ru,
}


class WordsViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.all()
    serializer_class = WordSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def list(self, request):
        lang_from = lang_dict.get(request.GET.get('lang_from')) or lang_dict['en']
        lang_to = lang_dict.get(request.GET.get('lang_to')) or lang_dict['en']

        progress = request.user.progress
        start_position = progress - settings.TEST_VARIANCE
        if progress - settings.TEST_VARIANCE <= 0:
            start_position = 0

        word = (
            Word.sa.query(
                Word.sa.id,
                lang_from.label('word'),
            )
            .filter(and_(
                Word.sa.position >= start_position,
                or_(
                    WordScore.sa.right_answers_in_a_row == None,  # noqa
                    WordScore.sa.right_answers_in_a_row < 5,
                ),
            ))
            .outerjoin(WordScore.sa, WordScore.sa.word_id == Word.sa.id)
            .order_by('position')
            .first()
        )

        options = (
            Word.sa.query(
                Word.sa.id,
                lang_to.label('word'),
            )
            .filter(and_(
                Word.sa.id != word.id,
                Word.sa.position >= start_position,
                Word.sa.position < start_position + 20,
            ))
            .limit(4)
            .all()
        )

        result_options = [{
            'word': random.choice(word.word.split(',')),
            'meta': encrypt_text('{},{}'.format(word.id, word.id)),
        }]
        for i in options:
            result_options.append({
                'word': random.choice(i.word.split(',')),
                'meta': encrypt_text('{},{}'.format(i.id, word.id)),
            })
        random.shuffle(result_options)
        return Response({
            'word': random.choice(word.word.split(',')),
            'options': result_options,
        })

        guess = request.POST.get('guess')
        if guess:
            try:
                option_id, correct_id = decrypt_text(guess).split(',')
                return Response({
                    'success': option_id == correct_id,
                })
            except Exception:
                pass
            return Response({
                'success': False,
                'detail': 'Wrong guess',
            }, status=400)
        return Response({'details': 'Wrong input parameters'}, status=400)


class GuessApi(APIView):
    def post(self, request, format=None):
        guess = request.data.get('guess')
        if not guess:
            return Response({'details': '"guess" is missing'}, 400)
        try:
            option_id, correct_id = decrypt_text(guess).split(',')
            return Response({
                'success': option_id == correct_id,
            })
        except Exception:
            pass
        return Response({
            'success': False,
            'detail': 'Wrong guess',
        }, status=400)
        return Response({'success': True})
