from rest_framework import serializers
from .models import User

"""
class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        exclude = ['password']i

    # register only - email/username/password
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email']
        )
        # verify password
        user.set_password(validated_data['password'])
        user.save()
        return user
"""
