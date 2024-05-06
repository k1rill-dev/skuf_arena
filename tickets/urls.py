from django.urls import path

from tickets import views

urlpatterns = [
    path('', views.ListTicketAPIView.as_view(), name='tickets'),
    path('create/', views.CreateTicketAPIView.as_view(), name='create-ticket'),
    path('ticket', views.GetTicketAPIView.as_view(), name='get-ticket'),
    path('<int:pk>', views.GetTicketByID.as_view(), name='get-ticket-by-id'),
]
