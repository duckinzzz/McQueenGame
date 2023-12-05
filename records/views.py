from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Record
from .serializers import RecordSerializer


class RecordApiList(generics.ListCreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer



class RecordChangeApi(generics.RetrieveUpdateDestroyAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    lookup_field = 'user__username'
