from django.http import JsonResponse
from rest_framework.decorators import api_view
from .userUtil import user_is_duplicate_user_id, user_is_duplicate_nick_name, user_is_duplicate_email, user_create, \
    user_update_nick_name, user_update_email, user_update_user_id, user_hash_password, user_delete
from auth.authUtil import auth_is_valid_token, auth_token_to_data


@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def user(request):
    if request.method == 'GET':
        return user_is_duplicate(request)
    if request.method == 'POST':
        return user_sign_up(request)
    if request.method == 'PATCH':
        return user_data_update(request)
    if request.method == 'DELETE':
        return user_delete_client(request)


def user_is_duplicate(request):
    request_type = request.GET.get('case')
    value = request.GET.get('value')

    if request_type == 'id':
        result = user_is_duplicate_user_id(value)
        return JsonResponse({"result": result}, status=200)
    elif request_type == 'nickName':
        result = user_is_duplicate_nick_name(value)
        return JsonResponse({"result": result}, status=200)
    elif request_type == 'email':
        result = user_is_duplicate_email(value)
        return JsonResponse({"result": result}, status=200)
    else:
        return JsonResponse({"result": False, "message": "invalid value"}, status=401)


def user_sign_up(request):
    user_id = request.data['id']
    nick_name = request.data['nickName']
    email = request.data['email']
    password = request.data['password']

    is_duplicate = user_is_duplicate_user_id(user_id) and user_is_duplicate_email(
        email) and user_is_duplicate_nick_name(nick_name)

    if is_duplicate:
        return JsonResponse({"result": False, "message": "invalid value"}, status=401)
    else:
        hashed_password, salt = user_hash_password(password)
        result = user_create({
            "user_id": user_id,
            "nick_name": nick_name,
            "email": email,
            "password": hashed_password,
            "salt": salt
        })
        return JsonResponse({"result": result}, status=200)


def user_data_update(request):
    request_type = request.data['request_type']
    value = request.data['value']
    token = request.META['HTTP_AUTHORIZATION']

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:
        user_data = auth_token_to_data(token)
    else:
        return JsonResponse(is_valid, status=401)

    if request_type == 'id':
        result = not user_is_duplicate_user_id(value) and user_update_user_id(user_data.user_pk, value)
        return JsonResponse({"result": result}, status=200)
    elif request_type == 'nickName':
        result = not user_is_duplicate_nick_name(value) and user_update_nick_name(user_data.user_pk, value)
        return JsonResponse({"result": result}, status=200)
    elif request_type == 'email':
        result = not user_is_duplicate_email(value) and user_update_email(user_data.user_pk, value)
        return JsonResponse({"result": result}, status=200)
    else:
        return JsonResponse({"result": False, "message": "Invalid value"}, status=401)


def user_delete_client(request):
    token = request.META['HTTP_AUTHORIZATION']
    is_valid = auth_is_valid_token(token)

    if is_valid["result"]:
        user_data = auth_token_to_data(token)
        result = user_delete(user_data.user_pk)
        if result:
            return JsonResponse({"result": result}, status=200)
        else:
            return JsonResponse({"result": False, "message": "Invalid value"}, status=401)
    else:
        return JsonResponse(is_valid, status=401)
