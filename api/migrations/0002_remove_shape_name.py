# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-05-06 10:27
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shape',
            name='name',
        ),
    ]
