import re

from django.core.management.base import BaseCommand, CommandError

from learnwords.models import Word

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
        parser.add_argument('file', nargs='+', type=str)

    def handle(self, *args, **options):
        Word.objects.all().delete()
        reg = r'([0-9]+) *?([\w ]+) *?(?=\[)\[(.+?)\] *?(.+?) *?([0-9][0-9\.]*)'
        with open(options['file'][0], 'r') as f:
            for line in f.readlines():
                match = re.search(reg, line)
                if match:
                    print(match.groups())
                    frequency = int(match.group(5).replace('.', ''))
                    Word.objects.create(
                        name=match.group(2).strip(' '),
                        transcription=match.group(3).strip(' '),
                        translation=match.group(4).strip(' '),
                        frequency=frequency
                    )
