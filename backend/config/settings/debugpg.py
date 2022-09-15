from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todo',
        'USER': 'django',
        'PASSWORD': 'geekbrains',
        'HOST': 'db',
        'PORT': '5432',
    }
}