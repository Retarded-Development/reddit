# Generated by Django 2.2.7 on 2019-11-17 15:40

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('submissions', '0004_auto_20191109_1715'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='submission',
            name='author_name',
        ),
        migrations.AddField(
            model_name='comment',
            name='children_array',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(), default=tuple, size=None),
        ),
        migrations.AddField(
            model_name='comment',
            name='path',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.PositiveIntegerField(), default=tuple, size=None),
        ),
        migrations.AlterField(
            model_name='comment',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='submissions.Comment'),
        ),
    ]
