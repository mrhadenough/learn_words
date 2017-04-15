from django.db import models


class Word(models.Model):
    word = models.CharField(max_length=255, null=True)
    part_of_speach = models.CharField(max_length=255, null=True)
    frequency = models.IntegerField()
    dispersion = models.FloatField(max_length=255, null=True)

    def __str__(self):
        return f'{self.frequency} {self.word}'
