from django.core.management import call_command
from django.core.management.base import BaseCommand

from authapp.models import CustomUser


class Command(BaseCommand):
    help = (
        "This command using call 'createsuperuser' for create"
        "superuser 'django' with email 'dj@gb.com' "
    )

    def handle(self, *args, **options):
        print('Please, enter superuser password!')
        call_command('createsuperuser', '--username=django', '--email=dj@gb.com')

        for i in range(3):
            CustomUser.objects.create_user(
                username=f'User_{i + 1}',
                password=f'djangorest{i + 1}',
                email=f'cu{i + 1}@gb.com',
            )
