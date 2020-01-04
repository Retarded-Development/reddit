import factory
from factory import fuzzy

from submissions.models import (Category, Comment, Notification, Submission,
                                Subscriptions, Vote)
from users.factories import UserFactory


class CategoryFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Category

    title = factory.Faker("company")
    slug = factory.Faker("bs")
    display_name = factory.Faker("text")


class SubmissionFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Submission

    # author_name = factory.Faker("first_name")
    author = factory.SubFactory(UserFactory)
    category = factory.SubFactory(CategoryFactory)


class VoteFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Vote

    submission = factory.SubFactory(SubmissionFactory)
    user = factory.SubFactory(UserFactory)
    vote_type = fuzzy.FuzzyChoice(choices=[Vote.UP, Vote.DOWN])


class CommentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Comment

    submission = factory.SubFactory(SubmissionFactory)
    author = factory.SubFactory(UserFactory)


class NotificationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Notification

    submission = factory.SubFactory(SubmissionFactory)
    to_user = factory.SubFactory(UserFactory)


class SubscriptionsFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Subscriptions

    submission = factory.SubFactory(SubmissionFactory)
    to_user = factory.SubFactory(UserFactory)
