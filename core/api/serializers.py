from rest_framework import serializers

from core.models import Word


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = ('id', 'word', 'part_of_speach', 'frequency', 'dispersion', )
