import os
from lxml import etree

from django.conf import settings

from .models import Word


def parse_files():
    file_path = os.path.join(settings.BASE_DIR, 'data/words.html')
    f = open(file_path, 'r')
    content = f.read()

    tree = etree.HTML(content)
    for row in tree.xpath('//*[@id="table1"]/tbody/tr'):
        word = getattr(row.find('td[2]'), 'text', '')
        part_of_speach = getattr(row.find('td[3]'), 'text', '')
        frequency = getattr(row.find('td[4]'), 'text', '')
        dispersion = getattr(row.find('td[5]'), 'text', '')
        if not word or not frequency:
            continue
        if not frequency:
            from ipdb import set_trace; set_trace()
            pass
        if not frequency.isdigit():
            continue
        word = Word.objects.create(
            word=word,
            part_of_speach=part_of_speach,
            frequency=frequency,
            dispersion=dispersion,
        )
        yield (word)
