from django.db import models
from django.contrib.auth.models import User


class Record(models.Model):
    record = models.PositiveBigIntegerField(verbose_name='Рекорд')
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE)

    def __str__(self):
        return str(self.record)
