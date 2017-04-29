from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers

from core.api.views import WordsViewSet, GuessApi
from accounts.api.views import UserAPI
from . import views

router = routers.DefaultRouter()
router.register(r'words', WordsViewSet)
# router.register(r'guess', GuessApi)

urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/guess/', GuessApi.as_view()),
    url(r'^api/v1/account/', UserAPI.as_view()),
    url(r'^admin/', admin.site.urls),
    url(r'^$', views.index, name='index'),
]
