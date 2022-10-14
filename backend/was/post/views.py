import uuid
from datetime import datetime

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

from auth.authUtil import auth_token_to_data, auth_is_valid_token, auth_type_of_token
from .serializers import ProductSerializer
from .postUtil import post_find_by_pk, post_update, post_create, post_delete, post_find_by_user_pk, \
    post_find_by_user_pk_date, image_upload_to_s3


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def post(request):
    if request.method == 'GET':
        return post_get(request)
    if request.method == 'POST':
        return post_post(request)
    if request.method == 'PATCH':
        return post_patch(request)
    if request.method == 'DELETE':
        return post_del(request)


def post_get(request):
    request_type = request.GET.get('case')

    if request_type == "userPk":
        value = request.GET.get('value')
        value = uuid.UUID(value)
        result = post_find_by_user_pk(value)
        return Response(ProductSerializer(result, many=True).data)
    if request_type == "postId":
        value = request.GET.get('value')
        value = uuid.UUID(value)
        result = post_find_by_pk(value)
        return Response(ProductSerializer(result).data)
    if request_type == "profile":
        date = datetime.strptime(request.GET.get('date'), "%Y-%m")
        user_pk = request.GET.get('userPk')
        result = post_find_by_user_pk_date(user_pk=user_pk, date=date)
        return Response(ProductSerializer(result, many=True).data)
    return JsonResponse({"result": False, "message": "invalid value"}, status=401)


def post_post(request):
    title = request.data['title']
    contents = request.data['contents']
    raw_date = request.data['date']
    token = request.META['HTTP_AUTHORIZATION']

    date = datetime.strptime(raw_date, "%Y-%m-%d")

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        token_type = auth_type_of_token(token)
        if token_type == "access_token":
            token_author = auth_token_to_data(token)
            if post_find_by_user_pk(user_pk=token_author.user_pk).filter(date=date):
                return JsonResponse({"result": False, "message": "invalid access"}, status=401)
            else:
                file = request.FILES.get('image').read()
                image = image_upload_to_s3(file, str(uuid.uuid4()))
                post_data = {
                    'title': title,
                    'contents': contents,
                    'image': image,
                    'author': token_author,
                    'date': date
                }
                post_create(post_data)
                return JsonResponse({"result": True}, status=200)
        elif token_type == "refresh_token":
            return JsonResponse({"result": False, "message": "invalid token"}, status=401)
    else:
        return JsonResponse(is_valid, status=401)


def post_patch(request):
    post_pk = uuid.UUID(request.data['postId'])
    title = request.data['title']
    contents = request.data['contents']
    raw_date = request.data['date']
    image_link = request.data['image']

    token = request.META['HTTP_AUTHORIZATION']  # 토큰 확인

    date = datetime.strptime(raw_date, "%Y-%m-%d")

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        token_type = auth_type_of_token(token)
        if token_type == "access_token":
            post_author = post_find_by_pk(post_pk).author
            token_author = auth_token_to_data(token)
            result = post_author == token_author
            if result:
                if type(image_link) == str:
                    image = image_link
                else:
                    file = request.FILES.get('image').read()
                    image = image_upload_to_s3(file, str(uuid.uuid4()))
                post_data = {
                    'title': title,
                    'contents': contents,
                    'image': image,
                    'date': date
                }
                post_update(post_pk=post_pk, **post_data)
                return JsonResponse({"result": True}, status=200)
            return JsonResponse({"result": False, "message": "invalid token"}, status=401)
        elif token_type == "refresh_token":
            return JsonResponse({"result": False, "message": "invalid token"}, status=401)
    else:
        return JsonResponse(is_valid, status=401)


def post_del(request):
    post_pk = uuid.UUID(request.data['postId'])
    token = request.META['HTTP_AUTHORIZATION']

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        token_type = auth_type_of_token(token)
        if token_type == "access_token":
            post_author = post_find_by_pk(post_pk).author
            token_author = auth_token_to_data(token)
            result = post_author == token_author
            if result:
                post_delete(post_pk=post_pk)
                return JsonResponse({"result": True}, status=200)
            return JsonResponse({"result": False, "message": "invalid token"}, status=401)
        elif token_type == "refresh_token":
            return JsonResponse({"result": False, "message": "invalid token"}, status=401)
    else:
        return JsonResponse(is_valid, status=401)
