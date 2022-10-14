from django.db import models
import uuid


class user(models.Model):
    user_pk = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user_id = models.CharField(unique=True, max_length=20)
    image = models.CharField(max_length=1024, blank=True)
    email = models.CharField(max_length=50)
    nick_name = models.CharField(unique=True, max_length=20)
    password = models.BinaryField(max_length=60)
    salt = models.BinaryField(max_length=29)

    class Meta:
        db_table = 'user'
