from django.urls import path
from .views import (
    business_user_list, business_user_detail,
    register, system_user_detail
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('users/', views.user_list, name='user-list'),  # GET (lista), POST (dodanie)
    path('users/<int:pk>/', views.user_update, name='user_update'),  # DELETE, PUT (edycja)
    # TODO dodaj brakujące mapowania endpointów 
    #  na implementację logiki biznesowej
    path('register/', register, name='register'),  # Endpoint rejestracji użytkownika

    # Endpointy do logowania i odświeżania tokenów
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint logowania (otrzymanie tokenu dostępu i odświeżającego)
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint odświeżania tokenu

    # Endpointy biznesowe użytkowników (jeśli są potrzebne)
    path('business_users/', business_user_list, name='business_user_list'),
    path('business_users/<int:pk>/', business_user_detail, name='business_user_detail'),

    # Endpointy użytkowników systemowych (jeśli są potrzebne)
    path('system_user/<int:pk>/', system_user_detail, name='system_user_detail'),
]
