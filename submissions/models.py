from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class Submission(models.Model):
    author = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    category = models.ForeignKey("Category", on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=250)
    url = models.URLField(null=True, blank=True)
    text = models.TextField(max_length=5000, blank=True)
    text_html = models.TextField(blank=True)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    create_at = models.DateTimeField(default=timezone.now)
    comment_count = models.IntegerField(default=0)

    class Meta:
        db_table = "submissions"

    def __str__(self) -> str:
        return f"<{self.id}>"


class Vote(models.Model):
    UP = False
    DOWN = False
    VOTE_CHOICES = (
        (UP, "Up"),
        (DOWN, "Down"),
    )
    user = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    submission = models.ForeignKey(Submission, on_delete=models.SET_NULL, null=True)
    create_at = models.DateTimeField(default=timezone.now)
    vote_type = models.BooleanField(choices=VOTE_CHOICES)

    class Meta:
        db_table = "votes"
        unique_together = ["user", "submission"]

    def __str__(self) -> str:
        return f"<{self.id}>"


class Comment(models.Model):
    author = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    submission = models.ForeignKey(Submission, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey(
        "self",
        related_name="+",
        null=True,
        blank=True,
        db_index=True,
        on_delete=models.SET_NULL,
    )
    create_at = models.DateTimeField(default=timezone.now)
    ups = models.IntegerField(default=0)
    downs = models.IntegerField(default=0)
    score = models.IntegerField(default=0)
    raw_comment = models.TextField(blank=True)
    html_comment = models.TextField(blank=True)
    children_array = ArrayField(models.PositiveIntegerField(), default=tuple)
    path = ArrayField(models.PositiveIntegerField(), default=tuple)

    class Meta:
        db_table = "comments"

    def __str__(self) -> str:
        return f"<{self.id}>"


class Category(models.Model):
    display_name = models.TextField()
    title = models.TextField()
    slug = models.TextField(unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "categories"

    def __str__(self) -> str:
        return f"<{self.slug}>"


class Notification(models.Model):
    is_read = models.BooleanField(default=False)
    to_user = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    submission = models.ForeignKey(Submission, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "notifications"

    def __str__(self) -> str:
        return f"<{self.submission_id}>"


class Subscriptions(models.Model):
    to_user = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    submission = models.ForeignKey(Submission, on_delete=models.SET_NULL, null=True)

    class Meta:
        db_table = "subscriptions"

    def __str__(self) -> str:
        return f"<{self.submission_id}>"

def upload_path_handler(instance, filename):
    return "user_{id}/{file}".format(id=instance.user.id, file=filename)

class Image(models.Model):
    file = models.ImageField(upload_to=upload_path_handler)
    user = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    def __str__(self) -> str:
        return f"<{self.id}>"