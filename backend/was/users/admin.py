from django.contrib import admin
from .models import user


@admin.register(user)
class UserAdmin(admin.ModelAdmin):
    list_display = ['user_pk', 'user_id', 'password', 'email', 'image']
