# Generated by Django 5.0.3 on 2024-05-06 07:27

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_user_date_of_birth'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=datetime.datetime(2024, 5, 6, 10, 27, 44, 577141), verbose_name='date of birth'),
        ),
    ]