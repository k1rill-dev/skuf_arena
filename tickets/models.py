from django.db import models
from django.utils import timezone

from authentication.models import User
from concert.models import Concert, ConcertPriceList


class Ticket(models.Model):
    event = models.ForeignKey(Concert, on_delete=models.CASCADE, verbose_name='Концерт')
    price = models.ForeignKey(ConcertPriceList, on_delete=models.CASCADE, verbose_name='Цена')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    buy_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user} {self.event} {self.price}'
