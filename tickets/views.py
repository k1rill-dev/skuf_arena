from datetime import date

from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import RetrieveAPIView, ListAPIView, GenericAPIView
from rest_framework.response import Response

from concert.models import Concert
from tickets.models import Ticket
from tickets.serializers import TicketSerializer, CreateTicketSerializer


class ListTicketAPIView(ListAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def get_queryset(self):
        return Ticket.objects.filter(user=self.request.user)


class CreateTicketAPIView(GenericAPIView):
    serializer_class = CreateTicketSerializer

    def post(self, request):
        event = Concert.objects.get(pk=request.data['event'])
        today = date.today()
        user_age = today.year - request.user.date_of_birth.year - (
                    (today.month, today.day) < (request.user.date_of_birth.month, request.user.date_of_birth.day))
        if event.age_limit > user_age:
            return JsonResponse({'error': 'You are too small'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
