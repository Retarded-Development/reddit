from submissions import factories
from users.factories import UserFactory


def run():
    for factory in [
        factories.UserFactory,
        factories.CategoryFactory,
        factories.SubmissionFactory,
        factories.VoteFactory,
        factories.CommentFactory,
        factories.SubmissionFactory,
        factories.NotificationFactory,
    ]:
        print(factory, len(factory.create_batch(10)))
    print("Done!")
