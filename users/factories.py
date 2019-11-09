import factory


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = "users.User"
        django_get_or_create = ("username",)

    username = factory.Sequence(lambda n: "username_{}".format(n))

    email = factory.Faker("email")

    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
