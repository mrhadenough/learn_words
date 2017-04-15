from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers

from core.api.views import WordsViewSet
from . import views

router = routers.DefaultRouter()
router.register(r'words', WordsViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]
