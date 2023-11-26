from django.shortcuts import render
from .models import Record

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import generics
from .serializers import RecordSerializer


class RecordApiList(generics.ListAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
