from rest_framework import serializers

from core.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'position', 'word', 'part_of_speach', 'translation', )
