# -*- coding: utf-8 -*-
from django.contrib import admin

from .models import Submission, Vote, Comment, Category, Notification, Subscriptions


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'title',
        'ups',
        'downs',
        'score',
        'create_at',
        'comment_count',
    )
    list_filter = ('author', 'category', 'create_at')


@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'submission', 'create_at', 'vote_type')
    list_filter = ('user', 'submission', 'create_at', 'vote_type')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'author',
        'submission',
        'parent',
        'create_at',
        'ups',
        'downs',
        'score',
        'raw_comment',
        'html_comment',
    )
    list_filter = ('author', 'submission', 'parent', 'create_at')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'display_name', 'title', 'slug', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('slug',)
    date_hierarchy = 'created_at'


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'is_read', 'to_user', 'created_at', 'submission')
    list_filter = ('is_read', 'to_user', 'created_at', 'submission')
    date_hierarchy = 'created_at'


@admin.register(Subscriptions)
class SubscriptionsAdmin(admin.ModelAdmin):
    list_display = ('id', 'to_user', 'created_at', 'submission')
    list_filter = ('to_user', 'created_at', 'submission')
    date_hierarchy = 'created_at'
