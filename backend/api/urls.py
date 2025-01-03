from django.urls import path
from .views import (
    business_user_list, business_user_update,
    register, system_user_detail
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # TODO dodaj brakujące mapowania endpointów 
    #  na implementację logiki biznesowej
    path('register/', register, name='register'),  # Endpoint rejestracji użytkownika

    # Endpointy do logowania i odświeżania tokenów
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Endpoint logowania (otrzymanie tokenu dostępu i odświeżającego)
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Endpoint odświeżania tokenu

    # Endpointy biznesowe użytkowników
    path('business_users/', business_user_list, name='business_user_list'),
    path('business_users/<int:pk>/', business_user_update, name='business_user_update'),

    # Endpointy użytkowników systemowych 
    path('me/', system_user_detail, name='system_user_detail'),
]
