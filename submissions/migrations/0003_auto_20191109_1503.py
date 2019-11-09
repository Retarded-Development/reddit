# Generated by Django 2.2.7 on 2019-11-09 15:03

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('submissions', '0002_notification_subscriptions'),
    ]

    operations = [
        migrations.AddField(
            model_name='vote',
            name='vote_type',
            field=models.BooleanField(choices=[(False, 'Up'), (False, 'Down')], default=True),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='vote',
            unique_together={('user', 'submission')},
        ),
    ]
