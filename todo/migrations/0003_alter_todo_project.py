# Generated by Django 4.0.6 on 2022-08-13 15:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_alter_todo_project'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.project'),
        ),
    ]
