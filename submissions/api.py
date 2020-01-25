from rest_framework import mixins, viewsets, permissions
from submissions.serializers import CategorySerializer, VoteSerializer, SubmissionSerializer, CommentSerializer
from submissions.models import Category, Vote, Submission, Comment

from submissions.permissions import IsAdminOrIsSelf, IsAdminOrReadonly
from rest_framework.viewsets import ModelViewSet

from django_filters.rest_framework import DjangoFilterBackend


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadonly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'slug']
    
    def get_queryset(self):
        return Category.objects.all()


class VotesViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = VoteSerializer
    permission_classes = [IsAdminOrReadonly]
    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)

    def get_queryset(self):
        return Vote.objects.all()

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAdminOrReadonly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'category', 'author', "category__slug"]

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

    def get_queryset(self):
        return Submission.objects.all()

class CommentViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAdminOrReadonly]
    filter_backends = [DjangoFilterBackend]

    filterset_fields = ['id', 'author', "submission"]

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

    def get_queryset(self):
        return Comment.objects.all()