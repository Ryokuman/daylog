# Generated by Django 4.0.6 on 2022-10-15 04:37

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('user_pk', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('user_id', models.CharField(max_length=20, unique=True)),
                ('image', models.CharField(blank=True, max_length=1024)),
                ('email', models.CharField(max_length=50)),
                ('nick_name', models.CharField(max_length=20, unique=True)),
                ('password', models.BinaryField(max_length=60)),
                ('salt', models.BinaryField(max_length=29)),
            ],
            options={
                'db_table': 'user',
            },
        ),
    ]
