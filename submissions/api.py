from rest_framework import mixins, viewsets, permissions
from submissions.serializers import CategorySerializer, VoteSerializer
from submissions.models import Category, Vote

from submissions.permissions import IsAdminOrIsSelf, IsAdminOrReadonly
from rest_framework.viewsets import ModelViewSet


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadonly]

    def get_queryset(self):
        return Category.objects.all()


class VotesViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = VoteSerializer
    permission_classes = [IsAdminOrReadonly]

    def get_queryset(self):
        return Vote.objects.all()
