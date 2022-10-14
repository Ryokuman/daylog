from .models import comment

from post.postUtil import post_find_by_pk
from datetime import datetime


# comment data update
def comment_update(comment_pk, contents):
    comment_to_update = comment.objects.filter(comment_pk=comment_pk)
    comment_to_update.update(contents=contents)
    comment_to_update.update(updated_at=datetime.utcnow())
    return True


# finder
def comment_find_by_post_pk(post_pk):
    post_data = post_find_by_pk(post_pk=post_pk)
    comment_data = comment.objects.filter(post=post_data)
    return comment_data


def comment_find_by_pk(comment_pk):
    comment_data = comment.objects.get(comment_pk=comment_pk)
    return comment_data


# comment creator
def comment_create(comment_data):
    comment.objects.create(**comment_data)
    return True


# post delete
def comment_delete(comment_pk):
    comment_data = comment.objects.get(comment_pk=comment_pk)
    if comment_data:
        comment_data.delete()
        return True
    else:
        return False
