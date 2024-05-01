from django.db import models
from django.utils import timezone


class Concert(models.Model):
    artist = models.CharField(max_length=100, verbose_name="Артист")
    title = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    vk_event = models.CharField(max_length=100, verbose_name="Ссылка на ВК")
    address = models.CharField(max_length=100, verbose_name="Адрес")
    date = models.DateTimeField(verbose_name='Дата проведения', default=timezone.now)

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
