from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import BusinessUser
from .serializers import BusinessUserSerializer
from .serializers import RegisterSerializer, SystemUserSerializer
from django.contrib.auth import get_user_model

SystemUser = get_user_model()

@api_view(['POST'])  # Rejestracja dostępna publicznie
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED  # Pomyślnie utworzono użytkownika
        )
    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST  # Nieprawidłowe dane wejściowe
    )

@api_view(['POST'])  # Logowanie dostępne publicznie
def login(request):
    # Załóżmy, że masz już odpowiedni widok logowania.
    pass

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])  # Wymaga zalogowania
def business_user_list(request):
    if request.method == 'GET':
        users = BusinessUser.objects.all()
        serializer = BusinessUserSerializer(users, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BusinessUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
@permission_classes([IsAuthenticated])  # Wymaga zalogowania
def business_user_update(request, pk):
    try:
        user = BusinessUser.objects.get(pk=pk)
    except BusinessUser.DoesNotExist:
        return Response({"error": "BusinessUser not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = BusinessUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": f"BusinessUser deleted with id: {pk}"}, status=status.HTTP_204_NO_CONTENT)