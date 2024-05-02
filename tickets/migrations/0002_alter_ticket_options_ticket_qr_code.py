# Generated by Django 5.0.3 on 2024-05-01 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ticket',
            options={'verbose_name': 'Билет', 'verbose_name_plural': 'Билеты'},
        ),
        migrations.AddField(
            model_name='ticket',
            name='qr_code',
            field=models.ImageField(blank=True, null=True, upload_to='media/qr_codes/'),
        ),
    ]
