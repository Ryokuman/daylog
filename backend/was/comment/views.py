import uuid

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from auth.authUtil import auth_token_to_data, auth_is_valid_token, auth_type_of_token
from post.postUtil import post_find_by_pk

from .serializers import CommentSerializer
from .commentUtil import comment_create, comment_find_by_post_pk, comment_find_by_pk, comment_update, comment_delete


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def comment(request):
    if request.method == 'GET':
        return comment_get(request)
    if request.method == 'POST':
        return comment_post(request)
    if request.method == 'PATCH':
        return comment_patch(request)
    if request.method == 'DELETE':
        return comment_del(request)


def comment_get(request):
    raw_post_pk = request.GET.get('postId')
    post_pk = uuid.UUID(raw_post_pk)
    comment_data = comment_find_by_post_pk(post_pk=post_pk)
    return Response(CommentSerializer(comment_data, many=True).data)


def comment_post(request):
    post_pk = uuid.UUID(request.data['postId'])
    contents = request.data['contents']
    token = request.META['HTTP_AUTHORIZATION']

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        if auth_type_of_token(token) == "access_token":
            post_data = post_find_by_pk(post_pk=post_pk)
            user_data = auth_token_to_data(token=token)
            comment_data = {
                'post': post_data,
                'author': user_data,
                'contents': contents
            }
            comment_create(comment_data)
            return JsonResponse({"result": True}, status=201)
        return JsonResponse({"result": False, "message": "invalid token"}, status=401)
    return JsonResponse(is_valid, status=401)


def comment_patch(request):
    comment_pk = uuid.UUID(request.data['commentId'])
    contents = request.data['contents']
    token = request.META['HTTP_AUTHORIZATION']

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        if auth_type_of_token(token) == "access_token":
            comment_data = comment_find_by_pk(comment_pk=comment_pk)
            user_data = auth_token_to_data(token=token)
            if comment_data.author.user_pk == user_data.user_pk:
                comment_update(comment_pk=comment_pk, contents=contents)
                return JsonResponse({"result": True}, status=201)
        return JsonResponse({"result": False, "message": "invalid token"}, status=401)
    return JsonResponse(is_valid, status=401)


def comment_del(request):
    comment_pk = uuid.UUID(request.data['commentId'])
    token = request.META['HTTP_AUTHORIZATION']

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        if auth_type_of_token(token) == "access_token":
            comment_data = comment_find_by_pk(comment_pk=comment_pk)
            user_data = auth_token_to_data(token=token)
            if comment_data.author.user_pk == user_data.user_pk:
                comment_delete(comment_pk=comment_pk)
                return JsonResponse({"result": True}, status=201)
        return JsonResponse({"result": False, "message": "invalid token"}, status=401)
    return JsonResponse(is_valid, status=401)
