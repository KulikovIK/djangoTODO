from django.db import models

from authapp.models import NULLABLE, CustomUser


class Project(models.Model):
    users = models.ManyToManyField(CustomUser)

    title = models.CharField(verbose_name='проект',
                             max_length=128,
                             )
    repository = models.URLField(verbose_name='репозиторий',
                                 max_length=128,
                                 unique=True,
                                 **NULLABLE,
                                 )

    class Meta:
        verbose_name = 'проект'
        verbose_name_plural = 'проекты'


class ToDo(models.Model):
    project = models.ForeignKey(Project,
                                on_delete=models.CASCADE,
                                )

    user = models.ForeignKey(CustomUser,
                             on_delete=models.SET_NULL,
                             null=True,
                             )

    body = models.CharField(verbose_name='текст заметки',
                            max_length=256,
                            **NULLABLE,
                            )

    created_at = models.DateTimeField(verbose_name='дата создания',
                                      editable=False,
                                      auto_now_add=True,
                                      )

    updated_at = models.DateTimeField(verbose_name='дата обновления',
                                      editable=False,
                                      auto_now=True,
                                      )

    is_active = models.BooleanField(verbose_name='заметка активна',
                                    default=True,
                                    )

    class Meta:
        verbose_name = 'заметка'
        verbose_name_plural = 'заметки'
