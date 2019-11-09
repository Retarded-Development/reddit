from rest_framework import permissions


class IsAdminOrIsSelf:
    def has_permission(self, request, view):
        return False

    def has_object_permission(self, request, view, obj):

        if request.user.is_superuser:
            return True

        if request.method in permissions.SAFE_METHODS:
            return True
        author = getattr(obj, 'author', False)

        if author:
            return author == request.user
        return False


class IsAdminOrReadonly:
    def has_permission(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True
        return False
