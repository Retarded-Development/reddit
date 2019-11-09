from django.db import models
from django.utils import timezone


class Submission(models.Model):
    author_name = models.CharField(null=False, max_length=12)
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
    user = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    submission = models.ForeignKey(Submission, on_delete=models.SET_NULL, null=True)
    create_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "votes"

    def __str__(self) -> str:
        return f"<{self.id}>"


class Comment(models.Model):
    author = models.ForeignKey("users.User", on_delete=models.SET_NULL, null=True)
    submission = models.ForeignKey(Submission, on_delete=models.SET_NULL, null=True)
    parent = models.ForeignKey(
        "self",
        related_name="children",
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

    class Meta:
        db_table = "comments"

    def __str__(self) -> str:
        return f"<{self.id}>"


class Category(models.Model):
    display_name = models.CharField(max_length=30)
    title = models.CharField(max_length=600)
    slug = models.CharField(max_length=30)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "categories"

    def __str__(self) -> str:
        return f"<{self.slug}>"
