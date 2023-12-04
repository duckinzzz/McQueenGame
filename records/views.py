

from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from .models import Record
from .serializers import RecordSerializer


class RecordApiList(generics.ListCreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class RecordChangeApi(generics.UpdateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


