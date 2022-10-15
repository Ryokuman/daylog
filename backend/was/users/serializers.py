from rest_framework import serializers
from .models import user


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['user_pk', 'image', 'user_id']
