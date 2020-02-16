# Generated by Django 2.2.10 on 2020-02-16 01:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('submissions', '0012_follow'),
    ]

    operations = [
        migrations.AddField(
            model_name='follow',
            name='to_user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='followers', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterUniqueTogether(
            name='follow',
            unique_together={('user', 'to_user')},
        ),
        migrations.RemoveField(
            model_name='follow',
            name='submission',
        ),
    ]