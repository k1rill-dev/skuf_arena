from rest_framework.generics import ListAPIView, GenericAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from concert.models import Concert
from concert.serializers import ListConcertSerializer, ConcertSerializer


class ListAllConcertAPIView(ListAPIView):
    permission_classes = (AllowAny,)
    queryset = Concert.objects.all()
    serializer_class = ListConcertSerializer


class ConcertAPIView(RetrieveAPIView):
    queryset = Concert.objects.all()
    serializer_class = ConcertSerializer
