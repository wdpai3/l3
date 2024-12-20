
# konwertuje obiekty Django na dane JSON
from rest_framework import serializers
from .models import BusinessUser, SystemUser


class BusinessUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessUser
        fields = ['id', 'first_name', 'last_name', 'role']

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer do rejestracji użytkownika systemowego.
    """
    password = serializers.CharField(write_only=True)

    class Meta:
        model = SystemUser
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name'] 


    def create(self, validated_data):
        user = SystemUser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class SystemUserSerializer(serializers.ModelSerializer):
    """
    Serializer do odczytu danych użytkownika systemowego.
    """
    class Meta:
        model = SystemUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'date_joined', 'is_active']  