# Generated by Django 5.0.3 on 2024-05-06 07:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tickets', '0003_ticket_is_held'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ticket',
            name='is_held',
        ),
    ]