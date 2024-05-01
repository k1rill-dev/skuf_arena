from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView

from concert.models import Concert
from concert.serializers import ListConcertSerializer, ConcertSerializer


class ListAllConcertAPIView(ListAPIView):
    queryset = Concert.objects.all()
    serializer_class = ListConcertSerializer


class ConcertAPIView(RetrieveAPIView):
    queryset = Concert.objects.all()
    serializer_class = ConcertSerializer
