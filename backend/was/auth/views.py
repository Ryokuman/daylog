from django.http import JsonResponse
from rest_framework.decorators import api_view
from .authUtil import auth_is_valid_token, auth_type_of_token, auth_reissuance_access_token, auth_token_to_data, \
    auth_generate_access_token, auth_generate_refresh_token
from users.userUtil import user_password_check, user_find_by_user_id
from users.models import user


@api_view(['GET', 'POST'])
def auth(request):
    if request.method == 'GET':
        return auth_get(request)
    if request.method == 'POST':
        return auth_login(request)


# get
def auth_get(request):
    token = request.META['HTTP_AUTHORIZATION']  # 토큰 확인

    is_valid = auth_is_valid_token(token)
    if is_valid["result"]:  # 토큰 유효성 확인
        token_type = auth_type_of_token(token)  # 토큰 타입 확인
        if token_type == "access_token":  # 토큰 타입이 엑세스 토큰인 경우
            user_data = auth_token_to_data(token)
            return_data = {
                "uuid": user_data.user_pk,
                "id": user_data.user_id,
                "nickName": user_data.nick_name,
                "email": user_data.email
            }
            return JsonResponse({"result": True, "userData": return_data})
        elif token_type == "refresh_token":  # 토큰 타입이 리프레쉬 토큰인 경우
            access_token = auth_reissuance_access_token(token)
            return JsonResponse({"result": True, "accessToken": access_token})
    else:  # 토큰이 유효하지 못한 경우
        return JsonResponse(is_valid, status=401)


# post
def auth_login(request):
    user_id = request.data['id']
    password = request.data['password']
    if user_id and password:
        try:
            user_data = user_find_by_user_id(user_id)
            result = user_password_check(password=password, user_data=user_data)
            if result:
                accesss_token = auth_generate_access_token(user_data)
                refresh_token = auth_generate_refresh_token(user_data)
                return JsonResponse({"accessToken": accesss_token, "refreshToken": refresh_token}, status=200)
            else:
                return JsonResponse({"result": False, "message": "invalid value"}, status=401)
        except user.DoesNotExist:
            return JsonResponse({"result": False, "message": "invalid value"}, status=401)
    else:
        return JsonResponse({"result": False, "message": "invalid access"}, status=401)
