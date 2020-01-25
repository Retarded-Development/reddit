from rest_framework import serializers, mixins
from django_gravatar.helpers import get_gravatar_url

from submissions.models import Category, Vote, Submission, Comment
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    gravatar_url = serializers.SerializerMethodField()

    def get_gravatar_url(self, obj):
        return get_gravatar_url(obj.email, size=50)

    class Meta:
        model = User
        fields = ['id', 'username', 'gravatar_url']

class CategorySerializer(
    serializers.ModelSerializer
):
    author = UserSerializer()
    class Meta:
        model = Category
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = '__all__'

class VoteSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(read_only=True)
    # submission = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Vote
        fields = '__all__'


class SubmissionSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    author = UserSerializer()
    class Meta:
        model = Submission
        fields = '__all__'