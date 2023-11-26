from rest_framework import serializers
from .models import Record

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class RecordSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Record
        fields = ('user','record')
