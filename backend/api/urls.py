from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.user_list, name='user-list'),  # GET (lista), POST (dodanie)
    path('users/<int:pk>/', views.user_update, name='user_update'),  # DELETE, PUT (edycja)
]
