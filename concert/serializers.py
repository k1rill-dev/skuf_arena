from rest_framework import serializers
from concert.models import Concert, ConcertTags, ConcertPhotos, ConcertVideos, ConcertPriceList


class ListConcertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Concert
        fields = ('artist', 'title', 'date')


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
        fields = ('place', 'price')


class ConcertSerializer(serializers.ModelSerializer):
    tags = ConcertTagSerializer(many=True)
    photos = ConcertPhotoSerializer(many=True)
    videos = ConcertVideoSerializer(many=True)
    prices = ConcertPriceListSerializer(many=True)

    class Meta:
        model = Concert
        fields = (
            'artist', 'title', 'date', 'description', 'vk_event', 'address', 'date', 'tags', 'photos', 'videos',
            'prices'
        )
        depth = 1
