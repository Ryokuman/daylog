from django.db import models
from users.models import user
import uuid


class post(models.Model):
    post_pk = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(user, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    contents = models.CharField(max_length=1024)
    image = models.CharField(max_length=100, blank=True)
    date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'post'

