from rest_framework import serializers

from core.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'position', 'part_of_speach', 'word_en', 'word_uk', 'word_ru', )
