from rest_framework import serializers
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

from authentication.models import User, UserPhoto


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPhoto
        fields = ('user', 'photo')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'email', 'username', 'first_name', 'last_name', 'date_of_birth')
        read_only_fields = ('id',)


class GetUserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = (
            'id', 'email', 'username', 'first_name', 'last_name', 'date_of_birth', 'avatar')
        read_only_fields = ('id',)


class RotateTokenSerializer(TokenRefreshSerializer):
    refresh = None
    access = None

    def validate(self, attrs):
        attrs['access'] = self.context['request'].COOKIES.get('access_token')
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh_token')

        if attrs['access'] and attrs['refresh']:
            return super().validate(attrs)
        else:
            raise InvalidToken(
                'No valid token found in cookie \'refresh\'')


class UserRegisterSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    first_name = serializers.CharField(max_length=255, required=True)
    last_name = serializers.CharField(max_length=255, required=True)
    date_of_birth = serializers.DateField(required=True)

    def create(self, validated_data):
        if validated_data['password1'] != validated_data['password2']:
            raise Exception("pass1 and pass2 dont matching")
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'], date_of_birth=validated_data['date_of_birth'])
        user.set_password(validated_data['password1'])
        user.save()
        return user

    class Meta:
        model = User
        fields = (
            'email', 'username', 'first_name', 'last_name', 'password1', 'password2', 'date_of_birth')
