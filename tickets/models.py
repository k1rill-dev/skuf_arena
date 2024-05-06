import datetime
from io import BytesIO
from django.core.files import File
from PIL import Image
from django.db import models
from authentication.models import User
from concert.models import Concert, ConcertPriceList
import qrcode


class Ticket(models.Model):
    event = models.ForeignKey(Concert, on_delete=models.CASCADE, verbose_name='Концерт')
    price = models.ForeignKey(ConcertPriceList, on_delete=models.CASCADE, verbose_name='Цена')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    buy_date = models.DateTimeField(auto_now_add=True)
    qr_code = models.ImageField(upload_to='media/qr_codes/',
                                null=True, blank=True)

    def __str__(self):
        return f'{self.user} {self.event} {self.price}'

    def save(self, *args, **kwargs):
        self.buy_date = datetime.datetime.now()
        data = f'{self.user} | {self.event} | {self.price} | {self.buy_date.strftime("%Y-%m-%d %H:%M")}'
        qrcode_img = qrcode.make(
            data)
        canvas = Image.new('RGB', (1000, 1000), 'white')
        canvas.paste(qrcode_img)
        user = self.user.first_name if self.user.first_name != "" else self.user.username
        fname = f'qr_code-{user}-{self.pk}.png'
        buffer = BytesIO()
        canvas.save(buffer, 'PNG')
        self.qr_code.save(fname, File(buffer), save=False)
        canvas.close()
        super().save(*args, **kwargs)

    class Meta:
        verbose_name = 'Билет'
        verbose_name_plural = 'Билеты'
