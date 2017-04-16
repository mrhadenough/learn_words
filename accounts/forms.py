from django import forms

from accounts.models import FacebookUser


class FacebookUserForm(forms.ModelForm):
    class Meta:
        model = FacebookUser
        fields = ('access_token', 'email', 'expires_in', 'name', 'picture', 'facebook_user_id', )
