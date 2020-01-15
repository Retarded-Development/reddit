from rest_framework import mixins, viewsets, permissions
from submissions.serializers import CategorySerializer, VoteSerializer, SubmissionSerializer
from submissions.models import Category, Vote, Submission

from submissions.permissions import IsAdminOrIsSelf, IsAdminOrReadonly
from rest_framework.viewsets import ModelViewSet

from django_filters.rest_framework import DjangoFilterBackend


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadonly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', ]
    
    def get_queryset(self):
        return Category.objects.all()


class VotesViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = VoteSerializer
    permission_classes = [IsAdminOrReadonly]

    def get_queryset(self):
        return Vote.objects.all()

class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAdminOrReadonly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['id', 'category', 'author']

    def get_queryset(self):
        return Submission.objects.all()
