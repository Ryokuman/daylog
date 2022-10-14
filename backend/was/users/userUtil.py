import bcrypt
from .models import user


# duplicate check
def user_is_duplicate_user_id(user_id):
    result = user.objects.filter(user_id=user_id)
    if result:
        return True
    else:
        return False


def user_is_duplicate_nick_name(nick_name):
    result = user.objects.filter(nick_name=nick_name)
    if result:
        return True
    else:
        return False


def user_is_duplicate_email(email):
    result = user.objects.filter(email=email)
    if result:
        return True
    else:
        return False


# user data update
def user_update_user_id(user_pk, user_id):
    user.objects.get(user_pk=user_pk).update(user_id=user_id)
    return True


def user_update_nick_name(user_pk, nick_name):
    user.objects.get(user_pk=user_pk).update(nick_name=nick_name)
    return True


def user_update_email(user_pk, email):
    user.objects.get(user_pk=user_pk).update(email=email)
    return True


# return finder
def user_find_by_pk(user_pk):
    user_data = user.objects.get(user_pk=user_pk)
    return user_data


def user_find_by_user_id(user_id):
    user_data = user.objects.get(user_id=user_id)
    return user_data


# password
def user_hash_password(password):
    password = str(password).encode('utf-8')
    salt = bcrypt.gensalt()
    hash_password = bcrypt.hashpw(password, salt)
    return hash_password, salt


def user_password_check(password, user_data):
    password = str(password).encode('utf-8')
    hash_password = bcrypt.hashpw(password, user_data.salt)
    result = hash_password == user_data.password
    return result


# user creator
def user_create(user_data):
    user.objects.create(**user_data)
    return True


# user delete
def user_delete(user_pk):
    user_data = user.objects.get(user_pk=user_pk)
    if user_data:
        user_data.delete()
        return True
    else:
        return False
