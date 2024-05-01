# Generated by Django 5.0.3 on 2024-05-01 12:09

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Concert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('artist', models.CharField(max_length=100, verbose_name='Артист')),
                ('title', models.CharField(max_length=100, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Описание')),
                ('vk_event', models.CharField(max_length=100, verbose_name='Ссылка на ВК')),
                ('address', models.CharField(max_length=100, verbose_name='Адрес')),
                ('date', models.DateTimeField(default=django.utils.timezone.now, verbose_name='Дата проведения')),
            ],
            options={
                'verbose_name': 'Концерт',
                'verbose_name_plural': 'Концерты',
            },
        ),
        migrations.CreateModel(
            name='ConcertPhotos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(upload_to='media/%Y/%m/%d/photos', verbose_name='Фото')),
                ('concert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_set', to='concert.concert', verbose_name='Концерт')),
            ],
            options={
                'verbose_name': 'Фото',
                'verbose_name_plural': 'Фото',
            },
        ),
        migrations.CreateModel(
            name='ConcertPriceList',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place', models.CharField(max_length=100, verbose_name='Место')),
                ('price', models.IntegerField(verbose_name='Цена')),
                ('concert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_set', to='concert.concert', verbose_name='Концерт')),
            ],
            options={
                'verbose_name': 'Цена',
                'verbose_name_plural': 'Цены',
            },
        ),
        migrations.CreateModel(
            name='ConcertTags',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=350, verbose_name='Тэг')),
                ('concert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_set', to='concert.concert', verbose_name='Концерт')),
            ],
            options={
                'verbose_name': 'Тэг',
                'verbose_name_plural': 'Тэги',
            },
        ),
        migrations.CreateModel(
            name='ConcertVideos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.CharField(max_length=350, verbose_name='Видео')),
                ('concert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='%(class)s_set', to='concert.concert', verbose_name='Концерт')),
            ],
            options={
                'verbose_name': 'Видео',
                'verbose_name_plural': 'Видео',
            },
        ),
    ]
