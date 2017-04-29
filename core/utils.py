import os
from Crypto.Cipher import AES
import base64

import requests
from lxml import etree

from django.conf import settings

from .models import Word


def yandex_translate(text, lang):
    url = 'https://translate.yandex.net/api/v1.5/tr.json/translate'
    params = {
        'key': settings.YANDEX_TRANSLATION_KEY,
        'text': text,
        'lang': lang,
    }
    response = requests.get(url, params=params)
    if not response.ok:
        raise Exception('Bad response'.format(response.content))
    return response.json()['text']


def parse_files():
    file_path = os.path.join(settings.BASE_DIR, 'data/words.html')
    f = open(file_path, 'r')
    content = f.read()

    tree = etree.HTML(content)
    position = 1
    for row in tree.xpath('//*[@id="table1"]/tbody/tr'):
        word = (getattr(row.find('td[2]'), 'text', '') or '').strip(' \xa0')
        part_of_speach = getattr(row.find('td[3]'), 'text', '')
        frequency = getattr(row.find('td[4]'), 'text', '')
        dispersion = getattr(row.find('td[5]'), 'text', '')
        if not word or not frequency:
            continue
        if not frequency:
            print('Error: frequency is not set')
        if not frequency.isdigit():
            continue
        translation = {
            'ua': yandex_translate(word, lang='en-uk'),
            'ru': yandex_translate(word, lang='en-ru'),
        }
        word = Word.objects.create(
            position=position,
            word=word,
            part_of_speach=part_of_speach,
            frequency=frequency,
            dispersion=dispersion,
            translation=translation,
        )
        yield (word)
        position += 1


def encrypt_text(text):
    cipher = AES.new(settings.SECRET_KEY[:32], AES.MODE_ECB)
    return base64.b64encode(cipher.encrypt(str(text).ljust(32)))


def decrypt_text(text):
    cipher = AES.new(settings.SECRET_KEY[:32], AES.MODE_ECB)
    return cipher.decrypt(base64.b64decode(str(text))).decode('utf-8').strip(' ')
