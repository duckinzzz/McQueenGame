from rest_framework import serializers
from .models import Record

from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)


class RecordSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Record
        fields = ('user', 'record')

    def create(self, validated_data):
        username = self.context['request'].data['user']['username']
        user_instance = User.objects.get(username=username)
        record = Record.objects.create(user=user_instance, **validated_data)

        return record
