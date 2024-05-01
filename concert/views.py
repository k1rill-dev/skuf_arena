from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView

from concert.models import Concert
from concert.serializers import ListConcertSerializer


class ListAllConcertAPIView(ListAPIView):
    queryset = Concert.objects.all()
    serializer_class = ListConcertSerializer


class ConcertAPIView(RetrieveAPIView):
    queryset = ...
    serializer_class = ...
