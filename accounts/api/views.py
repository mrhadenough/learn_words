import json

from django.contrib.auth import login
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import FacebookUser, User
from accounts.forms import FacebookUserForm
from .serializers import UserSerializer
from .permissions import UserPermission


class UserAPI(APIView):
    permission_classes = (UserPermission, )

    def get(self, request, format=None):
        return Response(UserSerializer(request.user).data)

    def post(self, request):
        try:
            data = json.loads(request.body)
        except Exception:
            return Response({'details': 'Invalid JSON'}, 400)

        facebook_user = FacebookUser.objects.filter(facebook_user_id=data.get('userID', '')).first()
        if facebook_user:
            login(request, facebook_user.user)
            return Response({'success': True})

        data['access_token'] = data.get('accessToken')
        data['facebook_user_id'] = data.get('userID')
        data['expires_in'] = data.get('expiresIn')
        form = FacebookUserForm(data=data)
        if not form.is_valid():
            return Response({'details': form.errors}, 400)

        facebook_user = form.save(commit=False)
        user = User.objects.create(first_name=data.get('name'), email=data.get('email'))
        facebook_user.user = user
        facebook_user.is_active = True
        facebook_user.save()
        login(request, user)
        return Response({'success': True})
