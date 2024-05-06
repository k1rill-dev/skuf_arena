from django.db import models
from django.utils import timezone

from authentication.models import User


class Concert(models.Model):
    artist = models.CharField(max_length=100, verbose_name="Артист")
    title = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    vk_event = models.CharField(max_length=100, verbose_name="Ссылка на ВК")
    address = models.CharField(max_length=100, verbose_name="Адрес")
    age_limit = models.IntegerField(verbose_name='Возрастное ограничение', default=16)
    date = models.DateTimeField(verbose_name='Дата проведения', default=timezone.now)
    is_held = models.BooleanField(default=False, verbose_name='Прошел ли концерт')

    def __str__(self):
        return self.title

    @property
    def tags(self):
        return self.concerttags_set.all()

    @property
    def photos(self):
        return self.concertphotos_set.all()

    @property
    def videos(self):
        return self.concertvideos_set.all()

    @property
    def prices(self):
        return self.concertpricelist_set.all()

    class Meta:
        verbose_name = 'Концерт'
        verbose_name_plural = 'Концерты'


class BaseConcertExtension(models.Model):
    concert = models.ForeignKey(Concert, on_delete=models.CASCADE, related_name='%(class)s_set', verbose_name="Концерт")

    def __str__(self):
        return f"{self.concert}"

    class Meta:
        abstract = True


class ConcertRating(BaseConcertExtension):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    rating = models.FloatField(max_length=5, verbose_name='Рейтинг')

    def __str__(self):
        return f"{self.rating} - {self.concert} - {self.user}"

    class Meta:
        verbose_name = 'Рейтинг'
        verbose_name_plural = 'Рейтинг'


class ConcertPhotos(BaseConcertExtension):
    photo = models.ImageField(upload_to='media/%Y/%m/%d/photos', verbose_name="Фото")

    class Meta:
        verbose_name = 'Фото'
        verbose_name_plural = 'Фото'


class ConcertVideos(BaseConcertExtension):
    video = models.CharField(max_length=350, verbose_name="Видео")

    class Meta:
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'


class ConcertTags(BaseConcertExtension):
    tag = models.CharField(max_length=350, verbose_name="Тэг")

    class Meta:
        verbose_name = 'Тэг'
        verbose_name_plural = 'Тэги'


class ConcertPriceList(BaseConcertExtension):
    place = models.CharField(max_length=100, verbose_name="Место")
    price = models.IntegerField(verbose_name="Цена")

    class Meta:
        verbose_name = 'Цена'
        verbose_name_plural = 'Цены'

    def __str__(self):
        return f'{self.place} - {self.price}'
