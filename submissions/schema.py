import graphene

from graphene_django.types import DjangoObjectType
from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

from submissions.models import Category, Submission, Vote, Comment, Notification, Follow, CommentVote
from users.models import User

class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        # filter_fields = ["id", "slug", "submissions"]
        filter_fields = {
            'id': ['exact'],
            'slug': ['exact'],
            'submissions__id': ['gte']
        }
        interfaces = (relay.Node,)
        exclude = []





class SubmissionType(DjangoObjectType):
    class Meta:
        model = Submission
        interfaces = (relay.Node,)
        filter_fields = {}
        # fields = ('id', 'title')
        exclude = []

    # @classmethod
    # def get_queryset(cls, queryset, info):
    #     if info.context.user.is_anonymous:
    #         return queryset.filter(published=True)
    #     return queryset


class CommentType(DjangoObjectType):
    class Meta:
        model = Comment
        fields = ['id']
        interfaces = (relay.Node,)
        filter_fields = {}


class VoteType(DjangoObjectType):
    class Meta:
        model = Vote
        fields = ['id']
        interfaces = (relay.Node,)
        filter_fields = {}


class NotificationType(DjangoObjectType):
    class Meta:
        model = Notification
        fields = ['id']
        interfaces = (relay.Node,)
        filter_fields = {}


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ['id', 'bio', 'location', 'username']
        interfaces = (relay.Node,)
        filter_fields = {}


class FollowType(DjangoObjectType):
    class Meta:
        model = Follow
        fields = ['id', 'submission']
        interfaces = (relay.Node,)
        filter_fields = {}


class Query(object):
    all_categories = DjangoFilterConnectionField(CategoryType)
    all_submissions = DjangoFilterConnectionField(SubmissionType)
    all_comments = DjangoFilterConnectionField(CommentType)
    all_votes = DjangoFilterConnectionField(VoteType)
    all_notifications = DjangoFilterConnectionField(NotificationType)
    all_users = DjangoFilterConnectionField(UserType)

    user = relay.node.Field(UserType, id=graphene.Int(), username=graphene.String())
    me = relay.node.Field(UserType)
    category = relay.node.Field(CategoryType, id=graphene.Int(), slug=graphene.String())

    my_categories = DjangoFilterConnectionField(CategoryType)
    my_submissions = DjangoFilterConnectionField(SubmissionType)
    replied_submissions = DjangoFilterConnectionField(SubmissionType)
    followed_submissions = DjangoFilterConnectionField(SubmissionType)
    my_comments = DjangoFilterConnectionField(CommentType)
    my_downvoted_submissions = DjangoFilterConnectionField(SubmissionType)
    my_voted_submissions = DjangoFilterConnectionField(VoteType)

    submission = relay.node.Field(SubmissionType, id=graphene.Int())

    def resolve_followed_submissions(self, info, **kwargs):
        return Submission.objects.filter(followers__user=info.context.user)

    def resolve_replied_submissions(self, info, **kwargs):
        return Submission.objects.filter(comments__author=info.context.user)

    def resolve_all_categories(self, info, **kwargs):
        return Category.objects.all()

    def resolve_my_categories(self, info, **kwargs):
        return Category.objects.filter(author=info.context.user)

    def resolve_my_comments(self, info, **kwargs):
        return Comment.objects.filter(author=info.context.user)

    def resolve_my_submissions(self, info, **kwargs):
        return Category.objects.filter(author=info.context.user)

    def resolve_all_votes(self, info, **kwargs):
        return Vote.objects.all()

    def resolve_all_comments(self, info, **kwargs):
        return Comment.objects.all()

    def resolve_all_submissions(self, info, **kwargs):
        return Submission.objects.all()

    def resolve_all_notifications(self, info, **kwargs):
        return Notification.objects.filter(to_user=info.context.user)

    def resolve_submission(self, info, **kwargs):
        id = kwargs.get("id")
        if id:
            return Category.objects.get(pk=id)

    def resolve_category(self, info, **kwargs):
        id = kwargs.get("id")
        slug = kwargs.get("slug")

        if id is not None:
            return Category.objects.get(pk=id)

        if slug is not None:
            return Category.objects.get(slug=slug)

        return None

    def resolve_me(self, info, **kwargs):
        return User.objects.get(id=info.context.user.id)

    def resolve_my_voted(self, info, **kwargs):
        return Vote.objects.filter(user=info.context.user.id)

    def resolve_my_downvoted_submissions(self, info, **kwargs):
        return Submission.objects.filter(votes__user=info.context.user.id, votes__vote_type=Vote.DOWN)

    def resolve_my_voted_submissions(self, info, **kwargs):
        return Submission.objects.filter(votes__user=info.context.user.id, votes__vote_type=Vote.UP)



class VoteSubmissionMutation(graphene.Mutation):
    class Arguments:
        submission_id = graphene.ID(required=True)
    submission_id = graphene.ID(required=True)

    def mutate(self, info, submission_id):
        created, obj = Vote.objects.get_or_create(submission_id=submission_id, user_id=info.context.user.id, vote_type=Vote.UP)
        if not created:
            obj.vote_type = Vote.UP
            obj.save()
        return VoteSubmissionMutation(submission_id=submission_id)


class DownVoteSubmissionMutation(graphene.Mutation):
    class Arguments:
        submission_id = graphene.ID(required=True)
    submission_id = graphene.ID(required=True)

    def mutate(self, info, submission_id):
        created, obj = Vote.objects.get_or_create(submission_id=submission_id, user_id=info.context.user.id, vote_type=Vote.DOWN)

        if not created:
            obj.vote_type = Vote.DOWN
            obj.save()
        return DownVoteSubmissionMutation(submission_id=submission_id)


class VoteCommentMutation(graphene.Mutation):
    class Arguments:
        comment_id = graphene.ID(required=True)

    comment_id = graphene.ID(required=True)

    def mutate(self, info, comment_id):
        created, obj = CommentVote.objects.get_or_create(comment_id=comment_id, user_id=info.context.user.id, vote_type=Vote.UP)
        if not created:
            obj.vote_type = Vote.UP
            obj.save()
        return VoteCommentMutation(comment_id=comment_id)


class DownVoteCommentMutation(graphene.Mutation):
    class Arguments:
        comment_id = graphene.ID(required=True)

    comment_id = graphene.ID(required=True)

    def mutate(self, info, comment_id):
        created, obj = CommentVote.objects.get_or_create(
            comment_id=comment_id, user_id=info.context.user.id, vote_type=Vote.DOWN
        )
        if not created:
            obj.vote_type = Vote.DOWN
            obj.save()
        return DownVoteCommentMutation(comment_id=comment_id)


class NotificationMarkAsReadMutation(graphene.Mutation):
    class Arguments:
        notification_id = graphene.ID(required=True)

    notification_id = graphene.ID(required=True)

    def mutate(self, info, notification_id):
        created, obj = Notification.objects.get(
            id=notification_id, to_user_id=info.context.user.id
        )
        if not created:
            obj.is_read = True
            obj.save()
        return NotificationMarkAsReadMutation(notification_id=notification_id)

from graphene_django.forms.mutation import DjangoModelFormMutation
from django import forms


class CategoryForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = ('display_name', 'slug', 'title')


class OnlyOwnObjects(object):
    @classmethod
    def perform_mutate(cls, form, info):
        obj = form.save()
        setattr(obj, cls.user_field,  info.context.user)
        obj.save()
        kwargs = {cls._meta.return_field_name: obj}
        return cls(errors=[], **kwargs)

    @classmethod
    def get_form_kwargs(cls, root, info, **input):
        kwargs = {"data": input}
        pk = input.pop("id", None)
        if pk:
            instance = cls._meta.model._default_manager.filter(**{'pk': pk, cls.user_field: info.context.user}).first()
            if not instance:
                kwargs['data']['id'] = None
            kwargs["instance"] = instance
        return kwargs


class CategoryMutation(OnlyOwnObjects, DjangoModelFormMutation):
    category = graphene.Field(CategoryType)

    class Meta:
        form_class = CategoryForm

    user_field = 'author'



class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('submission', 'parent', 'raw_comment')


class CommentMutation(OnlyOwnObjects, DjangoModelFormMutation):
    comment = graphene.Field(CommentType)

    class Meta:
        form_class = CommentForm

    user_field = 'author'




class SubmissionForm(forms.ModelForm):
    class Meta:
        model = Submission
        fields = ('category', 'title', 'url', 'text')


class SubmissionMutation(OnlyOwnObjects, DjangoModelFormMutation):
    submission = graphene.Field(SubmissionType)

    class Meta:
        form_class = SubmissionForm

    user_field = 'author'



class Mutation(graphene.ObjectType):
    mutate_category = CategoryMutation.Field()
#     delete_category
#
    mutate_comment = CommentMutation.Field()
#     delete_comment
#
    mutate_submission = SubmissionMutation.Field()
#     delete_submission
#
    vote_submission = VoteSubmissionMutation.Field()
    downvote_submission = DownVoteSubmissionMutation.Field()
    vote_comment = VoteCommentMutation.Field()
    downvote_comment = DownVoteCommentMutation.Field()
    notification_mark_as_read = NotificationMarkAsReadMutation.Field()
#     hide_user
#     hide_comment
#     follow_user
#   subscribe_to_submission

