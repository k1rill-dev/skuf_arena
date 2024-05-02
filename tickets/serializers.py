from rest_framework import serializers

from authentication.serializers import UserSerializer
from concert.serializers import ConcertPriceListSerializer, ConcertSerializer
from tickets.models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    price = ConcertPriceListSerializer()
    event = ConcertSerializer()
    user = UserSerializer()

    class Meta:
        model = Ticket
        fields = (
            'id', 'event', 'price', 'user', 'buy_date', 'qr_code'
        )


class CreateTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = (
            'event', 'price', 'user', 'buy_date', 'qr_code'
        )
        read_only_fields = ('qr_code',)
