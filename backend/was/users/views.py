from django.http import JsonResponse
from rest_framework.decorators import api_view
from .userUtil import user_find_by_name, user_comppassword, user_create_client, user_generate_access_token, \
    user_generate_refresh_token, user_token_to_data, UserDuplicateCheck, user_refresh_to_access, user_change_value


@api_view(['GET', 'POST', 'PATCH'])
def user(request):
    if request.method == 'GET':
        return user_is_duplicate(request)
    if request.method == 'POST':
        return user_sign_up(request)
    if request.method == 'PATCH':
        return user_patch(request)


def user_is_duplicate(request):
    case = request.GET.get('case')
    value = request.GET.get('value')
    checker = UserDuplicateCheck()

    if case == 'id':
        return JsonResponse({"result": checker.name(value)}, status=200)
    elif case == 'nickName':
        return JsonResponse({"result": checker.alias(value)}, status=200)
    elif case == 'email':
        return JsonResponse({"result": checker.email(value)}, status=200)
    else:
        return JsonResponse({"message": "Invalid value"}, status=401)


def user_sign_up(request):
    name = request.data['id']
    password = request.data['password']
    email = request.data['email']
    alias = request.data['nickName']

    user_create_client(name, email, password, alias)
    return JsonResponse({"result": True}, status=200)


def user_patch(request):
    payload = user_token_to_data(request.headers.get('Authorization', None))
    input_dict = dict(request.data['value'])
    if payload:
        result = user_change_value(value=input_dict, alias=payload.get('alias'))
        access_token = user_generate_access_token(result)
        refresh_token = user_generate_refresh_token(result)
        return JsonResponse({"accessToken": access_token, "refreshToken": refresh_token},
                            status=200)
    else:
        return JsonResponse({"message ": payload}, status=401)


@api_view(['POST'])
def auth(request):
    if request.method == 'POST':
        token = request.headers.get('Authorization', None)
        if token:
            return user_reissuance_access_token(request)
        else:
            return login(request)


def user_reissuance_access_token(request):
    token = request.headers.get('Authorization', None)
    payload = user_token_to_data(request.headers.get('Authorization', None))
    if payload:
        if payload.get('type') == 'refresh_token':
            access_token = user_refresh_to_access(token)
            return JsonResponse({"accessToken": access_token}, status=200)  # new access_token 반환
        else:
            return JsonResponse({"message": "it is not refresh_token"}, status=401)
    else:
        return JsonResponse({"message": payload}, status=401)


def login(request):
    input_name = request.data['id']
    input_password = request.data['password']
    access_token = None
    refresh_token = None

    if input_password and input_name:
        user_data = user_find_by_name(input_name).first()
        if user_data:
            if user_comppassword(input_password, user_data):
                access_token = user_generate_access_token(user_data)
                refresh_token = user_generate_refresh_token(user_data)
        else:
            return JsonResponse({"message": "invalid_data"}, status=400)

    data = {"accessToken": access_token, "refreshToken": refresh_token}

    return JsonResponse(data, status=200)
