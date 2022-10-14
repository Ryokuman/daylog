import jwt

from datetime import datetime, timedelta
from was.settings import JWT_SECRET_KEY, JWT_ALGORITHM
from users.userUtil import user_find_by_pk


# is_valid_token
def auth_is_valid_token(token):
    try:
        jwt.decode(bytes(token, 'utf-8'), "asweif", algorithms=JWT_ALGORITHM)
    except jwt.exceptions.ExpiredSignatureError:
        return {"result": False, "message": "expired token"}
    except jwt.exceptions.DecodeError:
        return {"result": False, "message": "invalid token"}
    return {"result": True}


# token type check
def auth_type_of_token(token):
    token_data = jwt.decode(bytes(token, 'utf-8'), JWT_SECRET_KEY, algorithms=JWT_ALGORITHM)
    type_of_token = token_data["type"]
    return type_of_token


# token_to_data
def auth_token_to_data(token):
    token_data = jwt.decode(bytes(token, 'utf-8'), JWT_SECRET_KEY, "HS256")
    user_pk = token_data["user_pk"]
    user_data = user_find_by_pk(user_pk)
    return user_data


# token generator
def auth_generate_access_token(user_data):
    data = {
        "user_pk": str(user_data.user_pk),
        'exp': datetime.utcnow() + timedelta(hours=2),
        'type': 'access_token'
    }
    access_token = jwt.encode(data, "asweif", "HS256")
    return access_token


def auth_generate_refresh_token(user_data):
    data = {
        "user_pk": str(user_data.user_pk),
        'exp': datetime.utcnow() + timedelta(weeks=2),
        'type': 'refresh_token'
    }
    refresh_token = jwt.encode(data, JWT_SECRET_KEY, "HS256")
    return refresh_token


def auth_reissuance_access_token(refresh_token):
    token_data = auth_token_to_data(refresh_token)
    data = {
        'user_pk': str(token_data.user_pk),
        'exp': datetime.utcnow() + timedelta(weeks=2),
        'type': 'access_token'
    }
    access_token = jwt.encode(data, JWT_SECRET_KEY, JWT_ALGORITHM)
    return access_token
