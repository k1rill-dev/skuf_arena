from django.contrib import admin

from concert.models import Concert, ConcertPhotos, ConcertVideos, ConcertTags, ConcertPriceList


class PhotoInline(admin.StackedInline):
    model = ConcertPhotos
    extra = 1


class TagsInline(admin.StackedInline):
    model = ConcertTags
    extra = 1


class PriceListInline(admin.StackedInline):
    model = ConcertPriceList
    extra = 1


class VideosInline(admin.StackedInline):
    model = ConcertVideos
    extra = 1


class ConcertAdmin(admin.ModelAdmin):
    inlines = (PhotoInline, TagsInline, PriceListInline, VideosInline,)


admin.site.register(Concert, ConcertAdmin)
