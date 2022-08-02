from django.contrib.auth.models import AbstractUser
from django.db import models

NULLABLE = {'blank': True, 'null': True}


class CustomUser(AbstractUser):
    # objects = models.Manager()

    first_name = models.CharField(max_length=64, verbose_name='имя')
    last_name = models.CharField(max_length=64, verbose_name='фамилия')
    birthday_year = models.PositiveIntegerField(**NULLABLE, verbose_name='год рождения')
    email = models.EmailField(**NULLABLE, unique=True, verbose_name='емаил')

    class Meta:
        verbose_name = 'пользователь'
        verbose_name_plural = 'пользователи'
