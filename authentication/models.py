import datetime

from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    last_login = models.DateTimeField(_("last login"), default=timezone.now)
    date_of_birth = models.DateField(_("date of birth"), default=datetime.datetime.now())
    avatar = models.ImageField(upload_to="avatar/%Y/%m/%d",
                               default="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6MUWcJG6bgOMZIx6jCgCbPn2ctugc3wgcn8cYbA5JPfj1sOEf")

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class UserPhoto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE
                             , verbose_name='Пользователь')
    photo = models.ImageField(upload_to=f'avatar/%Y/%m/%d', null=True, verbose_name='Фото')
