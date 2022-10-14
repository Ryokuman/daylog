from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/auth/', include('auth.urls')),
    path('api/post/', include('post.urls')),
    path('api/comment/', include('comment.urls')),
]
