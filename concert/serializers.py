from django.db.models import Min
from rest_framework import serializers
from concert.models import Concert, ConcertTags, ConcertPhotos, ConcertVideos, ConcertPriceList


class ConcertTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertTags
        fields = ('tag',)


class ConcertPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertPhotos
        fields = ('photo',)


class ConcertVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertVideos
        fields = ('video',)


class ConcertPriceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertPriceList
        fields = ('id', 'place', 'price')


class ListConcertSerializer(serializers.ModelSerializer):
    photo_concert = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    tags = ConcertTagSerializer(many=True)

    class Meta:
        model = Concert
        fields = ('id', 'artist', 'title', 'date', 'address', 'photo_concert', 'price', 'tags')
        depth = 1

    def get_photo_concert(self, obj):
        query = ConcertPhotos.objects.filter(concert_id=obj.id).first()
        serializer = ConcertPhotoSerializer(query)
        return {**serializer.data}

    def get_price(self, obj):
        query = ConcertPriceList.objects.filter(concert_id=obj.id).order_by('price').first()
        serializer = ConcertPriceListSerializer(query)
        return {**serializer.data}


class ConcertSerializer(serializers.ModelSerializer):
    tags = ConcertTagSerializer(many=True)
    photos = ConcertPhotoSerializer(many=True)
    videos = ConcertVideoSerializer(many=True)
    prices = ConcertPriceListSerializer(many=True)

    class Meta:
        model = Concert
        fields = (
            'id', 'artist', 'title', 'date', 'description', 'vk_event', 'address',
            'tags', 'photos', 'videos', 'prices'
        )
