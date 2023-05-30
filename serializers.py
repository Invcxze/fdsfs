from django.contrib.auth import authenticate
from rest_framework import serializers

from user.models import User


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
    )
    password = serializers.CharField(
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
        attrs['user'] = user
        return attrs


class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(min_length=6)

    class Meta:
        model = User
        fields = ["fio", "email", "password"]

    def save(self, **kwargs):
        user = User()
        user.fio = self.validated_data["fio"]
        user.email = self.validated_data["email"]
        user.set_password(self.validated_data["password"])
        user.save()
        return user
