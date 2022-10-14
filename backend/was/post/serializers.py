from rest_framework import serializers
from .models import post


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = post
        fields = ['post_pk', 'author', 'title', 'contents', 'image', 'date']
