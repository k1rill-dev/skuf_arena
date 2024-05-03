from django.db.models import Min, Avg
from rest_framework import serializers
from concert.models import Concert, ConcertTags, ConcertPhotos, ConcertVideos, ConcertPriceList, ConcertRating


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


class ConcertRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConcertRating
        fields = ('rating',)


class ListConcertSerializer(serializers.ModelSerializer):
    photo_concert = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()
    tags = ConcertTagSerializer(many=True)
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Concert
        fields = ('id', 'artist', 'title', 'date', 'address', 'photo_concert', 'price', 'tags', 'rating')
        depth = 1

    def get_photo_concert(self, obj):
        query = ConcertPhotos.objects.filter(concert_id=obj.id).first()
        serializer = ConcertPhotoSerializer(query)
        return {**serializer.data}

    def get_price(self, obj):
        query = ConcertPriceList.objects.filter(concert_id=obj.id).order_by('price').first()
        serializer = ConcertPriceListSerializer(query)
        return {**serializer.data}

    def get_rating(self, obj):
        avg_rating = ConcertRating.objects.filter(concert_id=obj.id).aggregate(avg=Avg('rating'))
        return {'avg_rating': avg_rating['avg']}


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
