from rest_framework import serializers, mixins

from submissions.models import Category, Vote, Submission
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class CategorySerializer(
    serializers.ModelSerializer
):
    author = UserSerializer()
    class Meta:
        model = Category
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