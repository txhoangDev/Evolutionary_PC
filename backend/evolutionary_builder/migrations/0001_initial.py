# Generated by Django 4.1.4 on 2023-01-12 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Build',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('budget', models.IntegerField(default=1000)),
                ('cpu_brand', models.CharField(default='', max_length=5)),
                ('gpu_brand', models.CharField(default='', max_length=7)),
                ('cpu_budget', models.IntegerField(default=0)),
                ('gpu_budget', models.IntegerField(default=0)),
                ('ram_budget', models.IntegerField(default=0)),
                ('cpu', models.CharField(default='', max_length=100)),
                ('gpu', models.CharField(default='', max_length=100)),
                ('ram', models.CharField(default='', max_length=100)),
            ],
        ),
    ]
