from django.db import models
from django.contrib.postgres.fields import JSONField
from accounts.models import User


class Word(models.Model):
    position = models.IntegerField(default=1)
    word = models.CharField(max_length=255, null=True)
    translation = JSONField(default={})
    part_of_speach = models.CharField(max_length=255, null=True)
    frequency = models.IntegerField()
    dispersion = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'{self.position} {self.word}'


class WordScore(models.Model):
    user = models.ForeignKey(User)
    word = models.ForeignKey(Word)
    right_answers_in_a_row = models.IntegerField(default=0)
    times_appeared = models.IntegerField(default=0)
