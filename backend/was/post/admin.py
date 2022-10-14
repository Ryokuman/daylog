from django.contrib import admin
from .models import post


@admin.register(post)
class UserAdmin(admin.ModelAdmin):
    list_display = ['post_pk', 'author', 'title', 'contents']
