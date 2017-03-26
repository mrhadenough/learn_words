from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers, serializers, viewsets

from . import views

router = routers.DefaultRouter()
# router.register(r'users', UserViewSet)

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^admin/', admin.site.urls),
    url(r'^api/v1/', include('rest_framework.urls', namespace='rest_framework')),
]
