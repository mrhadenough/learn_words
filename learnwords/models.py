from django.db import models

class Word(models.Model):
    name = models.CharField(max_length=255)
    transcription = models.CharField(max_length=255)
    translation = models.CharField(max_length=255)
    frequency = models.IntegerField(default=0)

    def __str__(self):
        return '{} - {}'.format(self.name, self.frequency)
