from django.db import models
from users.models import user
import uuid


class follow(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    follower = models.ForeignKey(user, on_delete=models.CASCADE)
    followee = models.ForeignKey(user, on_delete=models.CASCADE)

    class Meta:
        db_table = 'follow'
