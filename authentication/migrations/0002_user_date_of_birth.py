# Generated by Django 5.0.3 on 2024-05-03 05:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2024, 5, 3, 8, 22, 7, 448003), verbose_name='date of birth'),
        ),
    ]