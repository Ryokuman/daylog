from rest_framework import serializers
from .models import comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = ['comment_pk', 'author', 'contents']
