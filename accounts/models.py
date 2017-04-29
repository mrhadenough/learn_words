from django.db import models
from django.core.mail import send_mail
from django.utils import timezone
from django.utils.translation import ugettext as _

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def _create_user(self, email, password,
                     is_staff, is_superuser, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        now = timezone.now()
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser, last_login=now,
                          date_joined=now, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email=None, password=None, **extra_fields):
        return self._create_user(email, password, False, False,
                                 **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        return self._create_user(email, password, True, True,
                                 **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255, null=True)
    email = models.EmailField(unique=True)

    is_staff = models.BooleanField(
        _('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin '
                    'site.'))
    is_active = models.BooleanField(
        _('active'), default=False,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    progress = models.IntegerField(default=0)
    right_answers = models.IntegerField(default=0)
    wrong_answers = models.IntegerField(default=0)

    language = models.CharField(max_length=255, default='eng')

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.get_full_name()

    def get_short_name(self):
        return self.first_name

    def get_full_name(self):
        return '{} {}'.format(self.first_name, self.last_name)

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], html_message=message, **kwargs)

    # @property
    # def next_words(self):
    #     from core.models import Words
    #     Words.objects.filter()


class FacebookUser(models.Model):
    user = models.ForeignKey(User)
    facebook_user_id = models.CharField(max_length=255, null=True)
    access_token = models.CharField(max_length=255, null=True)
    email = models.EmailField(max_length=255, null=True)
    expires_in = models.IntegerField(default=0)
    name = models.CharField(max_length=255, null=True)
    picture = models.CharField(max_length=255, null=True)
