# Generated by Django 5.0.3 on 2024-05-03 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('concert', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='concert',
            name='age_limit',
            field=models.IntegerField(default=16, verbose_name='Возрастное ограничение'),
        ),
    ]
