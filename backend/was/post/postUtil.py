import boto3

from .models import post
from users.userUtil import user_find_by_pk
from was.settings import AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

from datetime import datetime


# post data update
def post_update(post_pk, title, contents, image, date):
    post_to_update = post.objects.filter(post_pk=post_pk)
    post_to_update.update(title=title)
    post_to_update.update(contents=contents)
    post_to_update.update(image=image)
    post_to_update.update(date=date)
    post_to_update.update(updated_at=datetime.utcnow())
    return True


# finder
def post_find_by_pk(post_pk):
    post_data = post.objects.get(post_pk=post_pk)
    return post_data


def post_find_by_user_pk(user_pk):
    user_data = user_find_by_pk(user_pk=user_pk)
    post_data = post.objects.filter(author=user_data)
    return post_data


def post_find_by_user_pk_date(user_pk, date):
    year = date.year
    month = date.month
    user_data = user_find_by_pk(user_pk=user_pk)
    post_data = post.objects.filter(author=user_data).filter(date__year=year, date__month=month).order_by('-date')
    return post_data


def post_find_by_date(date):
    post_data = post.objects.filter(date=date)
    return post_data


# image getter
def image_upload_to_s3(file, post_pk):
    import logging

    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    logger.addHandler(logging.StreamHandler())

    logger.info(AWS_STORAGE_BUCKET_NAME)

    image_type = "jpg"
    s3_client = boto3.client('s3', aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY)
    s3_client.put_object(Body=file, Bucket=AWS_STORAGE_BUCKET_NAME, Key=post_pk + "." + image_type)
    image_url = "http://daylogbycket.s3.ap-northeast-2.amazonaws.com/" + post_pk + "." + image_type
    image_url = image_url.replace(" ", "/")
    return image_url


# post creator
def post_create(post_data):
    post.objects.create(**post_data)
    return True


# post delete
def post_delete(post_pk):
    post_data = post.objects.get(post_pk=post_pk)
    if post_data:
        post_data.delete()
        return True
    else:
        return False
