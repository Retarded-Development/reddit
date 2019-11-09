from django.db import models
from django.utils import timezone

class Submission(ContentTypeAware):
    author_name = models.CharField(null=False, max_length=12)
    author = models.ForeignKey('users.User')
    title = models.CharField(max_length=250)
    url = models.URLField(null=True, blank=True)
    text = models.TextField(max_length=5000, blank=True)
    text_html = models.TextField(blank=True)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    timestamp = models.DateTimeField(default=timezone.now)
    comment_count = models.IntegerField(default=0)



class Vote(models.Model):
    user = models.ForeignKey('users.RedditUser')
    submission = models.ForeignKey(Submission)
    timestamp = models.DateTimeField(default=timezone.now)

class Comment(MttpContentTypeAware):
    author = models.ForeignKey('users.User')
    submission = models.ForeignKey(Submission)
    parent = models.ForeignKey(
        'self', related_name='children', null=True, blank=True, db_index=True
    )
    timestamp = models.DateTimeField(default=timezone.now)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    raw_comment = models.TextField(blank=True)
    html_comment = models.TextField(blank=True)


class Category(models.Model):
    display_name = models.CharField(max_length=30)
    title = models.CharField(max_length=600)

    display_name_count = models.IntegerField()
    title_count = models.IntegerField()
    description_count = models.IntegerField()
