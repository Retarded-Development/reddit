from rest_framework import serializers
from submissions.models import Category, Vote
from rest_framework import mixins


class CategorySerializer(
    serializers.ModelSerializer
):
    class Meta:
        model = Category
        fields = '__all__'


class VoteSerializer(serializers.ModelSerializer):
    # user = serializers.PrimaryKeyRelatedField(read_only=True)
    # submission = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Vote
        fields = '__all__'
