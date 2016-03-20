from django.contrib import admin

from .models import Word


class WordAdmin(admin.ModelAdmin):
    ordering = ('-frequency', )

admin.site.register(Word, WordAdmin)
