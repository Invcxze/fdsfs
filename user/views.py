from django.shortcuts import render
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response

from user.serializers import SignupSerializer, LoginSerializer


# Create your views here.
@api_view(["POST"])
def login(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        if not user:
            return Response({"error": {"code": 401, "message": 'Authentication failed'}})
        token, created = Token.objects.get_or_create(user=user)
        return Response({"data": {'user_token': token.key}})
    return Response({"error": {"code": 422, "message": 'Validation error', "errors": serializer.errors}})


@api_view(["POST"])
def signup(request):
    serializer = SignupSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"data": {'user_token': token.key}})
    return Response({"error": {"code": 422, "message": 'Validation error', "errors": serializer.errors}})


@api_view(["GET"])
def logout(request):
    if not request.user.is_active:
        return Response({"error": {"code": 403, "message": "Login failed"}})
    request.user.auth_token.delete()
    return Response({"data": {"message": "logout"}})
