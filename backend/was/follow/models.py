from django.db import models
from users.models import user
import uuid


class follow(models.Model):
    follow_pk = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    follower = models.ForeignKey(user, on_delete=models.CASCADE, related_name='follower')
    followee = models.ForeignKey(user, on_delete=models.CASCADE, related_name='followee')

    class Meta:
        db_table = 'follow'
