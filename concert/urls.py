from django.urls import path

from concert import views

urlpatterns = [
    path('concerts', views.ListAllConcertAPIView.as_view(), name='concerts'),
    path('concert/<int:pk>/', views.ConcertAPIView.as_view(), name='concert'),
]